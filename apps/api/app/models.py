from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base


class DemoRun(Base):
    __tablename__ = "demo_runs"

    id: Mapped[str] = mapped_column(String, primary_key=True, index=True)
    status: Mapped[str] = mapped_column(String, default="idle", index=True)
    issue_number: Mapped[int] = mapped_column(Integer, default=128)
    issue_title: Mapped[str] = mapped_column(String, default="Fix flaky login timeout test")
    repo: Mapped[str] = mapped_column(String, default="reiops-demo")
    branch: Mapped[str] = mapped_column(String, default="fix/login-timeout")
    agent_name: Mapped[str] = mapped_column(String, default="codex-runner-01")
    cost_usd: Mapped[float] = mapped_column(Float, default=0.0)
    tokens: Mapped[int] = mapped_column(Integer, default=0)
    risk: Mapped[str] = mapped_column(String, default="medium")
    risk_reason: Mapped[str] = mapped_column(String, default="This task touches authentication/session logic.")
    current_step: Mapped[int] = mapped_column(Integer, default=0)
    approved_by: Mapped[str | None] = mapped_column(String, nullable=True)
    pr_number: Mapped[int | None] = mapped_column(Integer, nullable=True)
    pr_title: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    events: Mapped[list["TraceEvent"]] = relationship(
        back_populates="run", cascade="all, delete-orphan", order_by="TraceEvent.step_index"
    )
    approval: Mapped["Approval"] = relationship(
        back_populates="run", cascade="all, delete-orphan", uselist=False
    )


class TraceEvent(Base):
    __tablename__ = "trace_events"

    id: Mapped[str] = mapped_column(String, primary_key=True, index=True)
    run_id: Mapped[str] = mapped_column(String, ForeignKey("demo_runs.id"), index=True)
    step_index: Mapped[int] = mapped_column(Integer, index=True)
    timestamp_label: Mapped[str] = mapped_column(String)
    type: Mapped[str] = mapped_column(String)
    message: Mapped[str] = mapped_column(String)
    status: Mapped[str] = mapped_column(String)
    details: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    run: Mapped[DemoRun] = relationship(back_populates="events")


class Approval(Base):
    __tablename__ = "approvals"

    id: Mapped[str] = mapped_column(String, primary_key=True, index=True)
    run_id: Mapped[str] = mapped_column(String, ForeignKey("demo_runs.id"), index=True)
    status: Mapped[str] = mapped_column(String, default="pending")
    reason: Mapped[str] = mapped_column(String, default="This task touches authentication/session logic.")
    summary: Mapped[str] = mapped_column(
        String,
        default="Fixed a timeout race condition in login session handling and added regression coverage for the flaky test.",
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    run: Mapped[DemoRun] = relationship(back_populates="approval")
