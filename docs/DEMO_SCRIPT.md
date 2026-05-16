# Demo Script

Recommended length: 60–90 seconds.

## Setup

Open these before recording:

- https://reiops.xyz
- https://reiops.xyz/demo
- https://t.me/ReiOps_bot?start=demo

Reset the demo state if needed:

```bash
curl -X POST https://api.reiops.xyz/api/runs/reset
```

## 1. Landing Page

Show the headline.

Voiceover:

> This is ReiOps. ReiOps makes AI agents safe for businesses. Instead of giving companies raw agents or scripts, we package them as managed workflows with sandboxing, monitoring, approval gates, audit logs, and support.

Click **Try Web Demo**.

## 2. Marketplace / Workflow

Show the GitHub Issue Fixer workflow.

Voiceover:

> The first workflow is GitHub Issue Fixer. It takes a GitHub issue, runs an agent in a controlled sandbox, executes tests, and blocks risky actions until a human approves them.

Click **Launch Demo Workflow**.

## 3. Live Trace

Show trace events, files changed, commands run, cost, and risk.

Voiceover:

> Here we can see the full execution trace: the issue source, branch creation, inspected files, edits, failed test, fix, passing tests, and cost tracking.

## 4. Approval Gate

Show waiting approval.

Voiceover:

> Because this workflow touches authentication logic, ReiOps blocks pull request creation. The agent cannot perform sensitive actions without human approval.

## 5. Telegram Operator Layer

Switch to Telegram.

Voiceover:

> The operator can approve critical actions directly from Telegram. This is important for teams that do not want another dashboard open all day.

Approve the PR.

## 6. Final State

Return to web dashboard.

Voiceover:

> After approval, the workflow completes and the final result becomes part of the audit trail: who approved it, what changed, what commands ran, and what the agent was allowed to do.

Final sentence:

> ReiOps is building the trusted distribution and operations layer for business-ready AI agents.
