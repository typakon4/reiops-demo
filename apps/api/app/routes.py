from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import DemoRun
from app.scenario import (
    AGENT_SUMMARY,
    COMMANDS_RUN,
    DIFF_PREVIEW,
    FILES_CHANGED,
    approve_run,
    create_run,
    newest_run,
    reject_run,
    request_changes,
    reset_state,
    schedule_progression,
)
from app.schemas import CurrentRunOut, DemoRunOut

router = APIRouter()


def current_payload(run: DemoRun | None) -> CurrentRunOut:
    if not run:
        return CurrentRunOut(
            run=None,
            events=[],
            approval=None,
            files_changed=FILES_CHANGED,
            commands_run=COMMANDS_RUN,
            cost_usd=0.0,
            tokens_label="0",
            risk="medium",
            risk_reason="This task touches authentication/session logic.",
            model="coding-agent",
            agent_summary=AGENT_SUMMARY,
            diff_preview=DIFF_PREVIEW,
            workspace="Demo Engineering",
            repo="reiops-demo",
            meta={"status_label": "Idle"},
        )
    return CurrentRunOut(
        run=run,
        events=list(run.events),
        approval=run.approval,
        files_changed=FILES_CHANGED,
        commands_run=COMMANDS_RUN,
        cost_usd=run.cost_usd,
        tokens_label="18.4k" if run.tokens >= 18400 else f"{run.tokens / 1000:.1f}k",
        risk=run.risk.title(),
        risk_reason=run.risk_reason,
        model="coding-agent",
        agent_summary=AGENT_SUMMARY,
        diff_preview=DIFF_PREVIEW,
        workspace="Demo Engineering",
        repo=run.repo,
        meta={"status_label": run.status.replace("_", " ").title()},
    )


@router.get("/health")
def health():
    return {"ok": True}


@router.post("/api/runs/reset", response_model=CurrentRunOut)
def reset(db: Session = Depends(get_db)):
    reset_state(db)
    return current_payload(None)


@router.post("/api/runs/start", response_model=CurrentRunOut)
async def start(db: Session = Depends(get_db)):
    run = create_run(db)
    schedule_progression(run.id)
    return current_payload(run)


@router.get("/api/runs/current", response_model=CurrentRunOut)
def current(db: Session = Depends(get_db)):
    return current_payload(newest_run(db))


@router.post("/api/runs/{run_id}/advance", response_model=CurrentRunOut)
async def advance(run_id: str, db: Session = Depends(get_db)):
    run = db.get(DemoRun, run_id)
    if not run:
        raise HTTPException(status_code=404, detail="Run not found")
    schedule_progression(run_id)
    return current_payload(run)


@router.post("/api/runs/{run_id}/approve", response_model=CurrentRunOut)
def approve(run_id: str, source: str = Query(default="web"), db: Session = Depends(get_db)):
    try:
        approved_by = "Telegram" if source.lower() == "telegram" else "Web"
        run = approve_run(db, run_id, approved_by=approved_by)
    except ValueError:
        raise HTTPException(status_code=404, detail="Run not found") from None
    return current_payload(run)


@router.post("/api/runs/{run_id}/reject", response_model=CurrentRunOut)
def reject(run_id: str, db: Session = Depends(get_db)):
    try:
        run = reject_run(db, run_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Run not found") from None
    return current_payload(run)


@router.post("/api/runs/{run_id}/request-changes", response_model=CurrentRunOut)
def changes(run_id: str, db: Session = Depends(get_db)):
    try:
        run = request_changes(db, run_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Run not found") from None
    return current_payload(run)
