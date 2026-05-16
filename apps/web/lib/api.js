const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const API_BASE = configuredApiUrl ? `${configuredApiUrl}/api` : "";

const FILES_CHANGED = ["src/auth/session.ts", "tests/auth.test.ts"];
const COMMANDS_RUN = ["npm test", "npm run lint"];
const DIFF_PREVIEW = [
  "File: src/auth/session.ts",
  "- const timeoutMs = 3000",
  "+ const timeoutMs = session.timeoutMs ?? 5000",
  "+ await waitForSessionReady(session.id, timeoutMs)"
];

const MOCK_STEPS = [
  ["10:42", "task", "GitHub Issue #128 assigned to GitHub Issue Fixer", "success"],
  ["10:43", "sandbox", "Started secure sandbox for vetted workflow", "success"],
  ["10:44", "branch", "Created branch fix/login-timeout", "success"],
  ["10:45", "edit", "Edited src/auth/session.ts", "success"],
  ["10:46", "test", "Ran npm test - 1 failing", "failed"],
  ["10:47", "fix", "Applied fix and updated regression test", "success"],
  ["10:49", "test", "Tests passing", "success"],
  ["10:50", "approval", "Policy approval required before opening PR", "waiting"]
];

const FINAL_EVENTS = [
  ["10:51", "approval", "Human approved policy exception", "success"],
  ["10:52", "pr", "Pull request #341 opened", "success"]
];

let mockRun = null;

function makeEvent([timestamp, type, message, status], index) {
  return {
    id: `mock-event-${index}`,
    run_id: mockRun?.id || "mock-run",
    step_index: index,
    timestamp_label: timestamp,
    type,
    message,
    status,
    details: null
  };
}

function idlePayload() {
  return {
    run: null,
    events: [],
    approval: null,
    files_changed: FILES_CHANGED,
    commands_run: COMMANDS_RUN,
    cost_usd: 0,
    tokens_label: "0",
    risk: "Medium",
    risk_reason: "GitHub Issue Fixer wants to open a PR touching authentication logic.",
    model: "vetted-workflow",
    agent_summary: "GitHub Issue Fixer patches a small issue, runs tests, and waits for policy approval before opening PR #341.",
    diff_preview: DIFF_PREVIEW,
    workspace: "Demo Engineering",
    repo: "demo-repo",
    demo: true,
    meta: { mock: true, status_label: "Idle" }
  };
}

function currentMockPayload() {
  if (!mockRun) return idlePayload();

  const elapsed = Math.floor((Date.now() - mockRun.startedAt) / 850);
  const baseEvents = MOCK_STEPS.slice(0, Math.max(1, Math.min(MOCK_STEPS.length, elapsed + 1))).map(makeEvent);
  const waiting = baseEvents.length >= MOCK_STEPS.length;
  const completed = mockRun.status === "completed";
  const rejected = mockRun.status === "rejected";
  const events = completed ? [...baseEvents, ...FINAL_EVENTS.map((event, index) => makeEvent(event, index + 9))] : baseEvents;
  const status = completed ? "completed" : rejected ? "rejected" : waiting ? "waiting_approval" : "running";

  const run = {
    id: mockRun.id,
    status,
    issue_number: 128,
    issue_title: "Fix login timeout regression",
    repo: "demo-repo",
    branch: "fix/login-timeout",
    agent_name: "GitHub Issue Fixer",
    cost_usd: waiting || completed ? 0.61 : Number((events.length * 0.07).toFixed(2)),
    tokens: waiting || completed ? 18400 : events.length * 1800,
    risk: "medium",
    risk_reason: "GitHub Issue Fixer wants to open a PR touching authentication logic.",
    current_step: events.length,
    approved_by: completed ? "Web" : null,
    pr_number: completed ? 341 : null,
    pr_title: completed ? "fix: stabilize login timeout handling" : null,
    created_at: new Date(mockRun.startedAt).toISOString(),
    updated_at: new Date().toISOString()
  };

  return {
    ...idlePayload(),
    run,
    events,
    approval: waiting || completed ? {
      id: "mock-approval",
      run_id: mockRun.id,
      status: completed ? "approved" : "pending",
      reason: run.risk_reason,
      summary: "Policy blocked a risky agent action before PR creation.",
      created_at: new Date(mockRun.startedAt).toISOString(),
      updated_at: new Date().toISOString()
    } : null,
    cost_usd: run.cost_usd,
    tokens_label: waiting || completed ? "18.4k" : `${(run.tokens / 1000).toFixed(1)}k`,
    meta: { mock: true, status_label: statusLabel(status) }
  };
}

function mockPost(path) {
  if (path === "/runs/reset") {
    mockRun = null;
    return idlePayload();
  }
  if (path === "/runs/start") {
    mockRun = { id: `mock-${Date.now()}`, startedAt: Date.now(), status: "running" };
    return currentMockPayload();
  }
  if (path.includes("/approve")) {
    if (!mockRun) mockRun = { id: `mock-${Date.now()}`, startedAt: Date.now() - 9000, status: "running" };
    mockRun.status = "completed";
    return currentMockPayload();
  }
  if (path.includes("/reject")) {
    if (!mockRun) mockRun = { id: `mock-${Date.now()}`, startedAt: Date.now() - 9000, status: "running" };
    mockRun.status = "rejected";
    return currentMockPayload();
  }
  if (path.includes("/request-changes")) {
    if (!mockRun) mockRun = { id: `mock-${Date.now()}`, startedAt: Date.now() - 9000, status: "running" };
    mockRun.status = "running";
    return currentMockPayload();
  }
  return currentMockPayload();
}

export async function apiGet(path) {
  if (!API_BASE) return currentMockPayload();

  try {
    const response = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`GET ${path} failed`);
    return response.json();
  } catch {
    return currentMockPayload();
  }
}

export async function apiPost(path) {
  if (!API_BASE) return mockPost(path);

  try {
    const response = await fetch(`${API_BASE}${path}`, { method: "POST" });
    if (!response.ok) throw new Error(`POST ${path} failed`);
    return response.json();
  } catch {
    return mockPost(path);
  }
}

export function statusLabel(status) {
  if (!status) return "Idle";
  return status.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
