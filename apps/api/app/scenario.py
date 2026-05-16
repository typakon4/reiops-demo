from __future__ import annotations

import asyncio
import json
import uuid
from datetime import datetime

from sqlalchemy import delete, desc, select
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models import Approval, DemoRun, TraceEvent

FILES_CHANGED = ["src/auth/session.ts", "tests/auth.test.ts"]
COMMANDS_RUN = ["npm test", "npm run lint"]
AGENT_SUMMARY = "Fixed a timeout race condition in login session handling and added regression coverage for the flaky test."
DIFF_PREVIEW = [
    "File: src/auth/session.ts",
    "- const timeoutMs = 3000",
    "+ const timeoutMs = session.timeoutMs ?? 5000",
    "+ await waitForSessionReady(session.id, timeoutMs)",
]

SCENARIO_STEPS = [
    ("10:42", "task", "Read GitHub issue #128", "success", {"source": "GitHub Issue #128"}),
    ("10:43", "branch", "Created branch fix/login-timeout", "success", {"branch": "fix/login-timeout"}),
    ("10:44", "info", "Inspected src/auth/session.ts", "success", {"file": "src/auth/session.ts"}),
    ("10:45", "edit", "Edited timeout handling", "success", {"file": "src/auth/session.ts"}),
    ("10:46", "test", "Ran npm test - 1 failing", "failed", {"command": "npm test"}),
    ("10:47", "info", "Inspected failing test", "success", {"file": "tests/auth.test.ts"}),
    ("10:48", "fix", "Applied fix and added regression test", "success", {"files": FILES_CHANGED}),
    ("10:49", "test", "Ran tests - passing", "success", {"commands": COMMANDS_RUN}),
    ("10:50", "approval", "Waiting for human approval before opening PR", "waiting", {"policy": "approval_required"}),
]

FINAL_EVENTS = [
    ("10:51", "approval", "Human approved PR creation", "success", {"approved_by": "Human operator"}),
    ("10:52", "pr", "Pull request #341 opened", "success", {"pr_number": 341}),
]

active_tasks: dict[str, asyncio.Task] = {}


def now() -> datetime:
    return datetime.utcnow()


def newest_run(db: Session) -> DemoRun | None:
    return db.scalars(select(DemoRun).order_by(desc(DemoRun.created_at))).first()


def add_event(
    db: Session,
    run: DemoRun,
    step_index: int,
    timestamp_label: str,
    event_type: str,
    message: str,
    status: str,
    details: dict | None = None,
) -> TraceEvent:
    event = TraceEvent(
        id=str(uuid.uuid4()),
        run_id=run.id,
        step_index=step_index,
        timestamp_label=timestamp_label,
        type=event_type,
        message=message,
        status=status,
        details=json.dumps(details or {}),
    )
    db.add(event)
    run.current_step = max(run.current_step, step_index)
    run.updated_at = now()
    return event


def reset_state(db: Session) -> None:
    db.execute(delete(TraceEvent))
    db.execute(delete(Approval))
    db.execute(delete(DemoRun))
    db.commit()


def create_run(db: Session) -> DemoRun:
    reset_state(db)
    run = DemoRun(
        id=str(uuid.uuid4()),
        status="running",
        issue_number=128,
        issue_title="Fix flaky login timeout test",
        repo="reiops-demo",
        branch="fix/login-timeout",
        agent_name="codex-runner-01",
        cost_usd=0.0,
        tokens=0,
        risk="medium",
        risk_reason="This task touches authentication/session logic.",
        current_step=0,
    )
    db.add(run)
    db.flush()
    db.add(
        Approval(
            id=str(uuid.uuid4()),
            run_id=run.id,
            status="pending",
            reason=run.risk_reason,
            summary=AGENT_SUMMARY,
        )
    )
    db.commit()
    db.refresh(run)
    return run


async def progress_run(run_id: str) -> None:
    for index, (timestamp, event_type, message, status, details) in enumerate(SCENARIO_STEPS, start=1):
        await asyncio.sleep(1.15 if index > 1 else 0.25)
        db = SessionLocal()
        try:
            run = db.get(DemoRun, run_id)
            if not run or run.status not in {"running", "waiting_approval"}:
                return
            if run.current_step >= index:
                continue
            add_event(db, run, index, timestamp, event_type, message, status, details)
            run.cost_usd = 0.61 if index >= 8 else round(index * 0.06, 2)
            run.tokens = 18400 if index >= 8 else index * 1800
            if index == len(SCENARIO_STEPS):
                run.status = "waiting_approval"
            db.commit()
        finally:
            db.close()


def schedule_progression(run_id: str) -> None:
    existing = active_tasks.get(run_id)
    if existing and not existing.done():
        existing.cancel()
    active_tasks[run_id] = asyncio.create_task(progress_run(run_id))


def approve_run(db: Session, run_id: str, approved_by: str = "Web") -> DemoRun:
    run = db.get(DemoRun, run_id)
    if not run:
        raise ValueError("run_not_found")
    approval = run.approval
    if approval:
        approval.status = "approved"
        approval.updated_at = now()
    run.status = "approved"
    run.approved_by = approved_by
    run.cost_usd = 0.61
    run.tokens = 18400
    for offset, event in enumerate(FINAL_EVENTS, start=10):
        details = dict(event[4])
        if event[1] == "approval":
            details["approved_by"] = approved_by
        add_event(db, run, offset, event[0], event[1], event[2], event[3], details)
    run.pr_number = 341
    run.pr_title = "fix: stabilize login timeout handling"
    run.status = "completed"
    run.updated_at = now()
    db.commit()
    db.refresh(run)
    return run


def reject_run(db: Session, run_id: str) -> DemoRun:
    run = db.get(DemoRun, run_id)
    if not run:
        raise ValueError("run_not_found")
    if run.approval:
        run.approval.status = "rejected"
        run.approval.updated_at = now()
    run.status = "rejected"
    add_event(db, run, 10, "10:51", "approval", "Human rejected PR creation", "failed", {"decision": "rejected"})
    db.commit()
    db.refresh(run)
    return run


def request_changes(db: Session, run_id: str) -> DemoRun:
    run = db.get(DemoRun, run_id)
    if not run:
        raise ValueError("run_not_found")
    if run.approval:
        run.approval.status = "changes_requested"
        run.approval.updated_at = now()
    run.status = "waiting_approval"
    add_event(
        db,
        run,
        10,
        "10:51",
        "approval",
        "Human requested changes before PR creation",
        "waiting",
        {"decision": "changes_requested"},
    )
    db.commit()
    db.refresh(run)
    return run
