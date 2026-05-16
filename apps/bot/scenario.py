TRACE_MESSAGES = {
    "Read GitHub issue #128": "Read GitHub issue #128",
    "Created branch fix/login-timeout": "Created branch fix/login-timeout",
    "Inspected src/auth/session.ts": "",
    "Edited timeout handling": "Edited src/auth/session.ts",
    "Ran npm test - 1 failing": "npm test — 1 failing",
    "Inspected failing test": "",
    "Applied fix and added regression test": "Applied fix and added regression test",
    "Ran tests - passing": "Tests passing",
    "Waiting for human approval before opening PR": "Policy blocked risky action: open_pull_request",
    "Human approved PR creation": "Human approved",
    "Pull request #341 opened": "Pull Request #341 opened",
}

TRACE_PREFIX = {
    "task": "🔎",
    "branch": "🌿",
    "edit": "✏️",
    "test": "🧪",
    "fix": "🛠",
    "approval": "⛔️",
    "pr": "✅",
    "info": "🔎",
}


def format_trace_event(event: dict) -> str:
    message = TRACE_MESSAGES.get(event["message"], event["message"])
    if not message:
        return ""
    prefix = TRACE_PREFIX.get(event["type"], "•")
    if event["status"] == "success" and event["type"] == "test":
        prefix = "✅"
    if event["status"] == "failed":
        prefix = "🧪"
    return f"{prefix} {message}"
