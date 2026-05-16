from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class TraceEventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    run_id: str
    step_index: int
    timestamp_label: str
    type: str
    message: str
    status: str
    details: str | None = None


class ApprovalOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    run_id: str
    status: str
    reason: str
    summary: str
    created_at: datetime
    updated_at: datetime


class DemoRunOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    status: str
    issue_number: int
    issue_title: str
    repo: str
    branch: str
    agent_name: str
    cost_usd: float
    tokens: int
    risk: str
    risk_reason: str
    current_step: int
    approved_by: str | None
    pr_number: int | None
    pr_title: str | None
    created_at: datetime
    updated_at: datetime


class CurrentRunOut(BaseModel):
    run: DemoRunOut | None
    events: list[TraceEventOut]
    approval: ApprovalOut | None
    files_changed: list[str]
    commands_run: list[str]
    cost_usd: float
    tokens_label: str
    risk: str
    risk_reason: str
    model: str
    agent_summary: str
    diff_preview: list[str]
    workspace: str
    repo: str
    demo: bool = True
    meta: dict[str, Any] = {}
