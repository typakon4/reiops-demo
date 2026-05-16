"use client";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Code2,
  FileCode2,
  GitBranch,
  Github,
  LayoutDashboard,
  Play,
  RefreshCcw,
  ShieldCheck,
  TerminalSquare,
  X
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { apiGet, apiPost, statusLabel } from "../lib/api";

const sidebar = [
  ["Marketplace", LayoutDashboard],
  ["Deployments", Activity],
  ["Control Plane", TerminalSquare],
  ["Approvals", ShieldCheck],
  ["Audit Logs", FileCode2],
  ["Policies", Github],
  ["Support", Code2]
];

const permissions = ["Read repo", "Create branch", "Edit files", "Run tests", "Open PR only after approval"];

const statusColor = {
  pending: "text-faint",
  running: "text-green",
  success: "text-green",
  failed: "text-red",
  waiting: "text-amber"
};

const agentCards = [
  ["codex-runner-01", "Code implementation", "Active", "branch-only", "$2/run", "approval before PR"],
  ["review-agent-01", "Diff review", "Idle", "read-only", "$0.50/run", "no write access"],
  ["ops-agent-01", "CI/DevOps", "Locked", "requires manual unlock", "$1/run", "deploy blocked"]
];

const historicalTraces = [
  ["#341", "Fix flaky login timeout test", "Completed", "$0.61", "Medium risk"],
  ["#340", "Update README install docs", "Completed", "$0.12", "Low risk"],
  ["#339", "Refactor payment retry logic", "Blocked", "$1.88", "High risk"],
  ["#338", "Investigate CI failure", "Completed", "$0.44", "Low risk"]
];

const traceDetailSections = [
  ["Original GitHub issue", ["#128 Fix flaky login timeout test", "Login session readiness races timeout under idle-session conditions."]],
  ["Agent plan", ["Read issue context", "Patch timeout handling", "Run tests and lint", "Wait for PR approval"]],
  ["Tool calls", ["repo.read_file", "repo.write_file", "terminal.run", "github.open_pull_request"]],
  ["Commands", ["npm test", "npm run lint"]],
  ["File diffs", ["src/auth/session.ts", "tests/auth.test.ts", "+ await waitForSessionReady(session.id, timeoutMs)"]],
  ["Test outputs", ["First run: 1 failing", "Final run: passing"]],
  ["Approval event", ["Policy blocked open_pull_request", "Human approved after risk review"]],
  ["Final PR summary", ["#341 fix: stabilize login timeout handling", "Trace, files, tests, cost, and approval saved"]]
];

const marketplaceWorkflows = [
  ["GitHub Issue Fixer", "A managed ReiOps workflow that fixes small GitHub issues, runs tests, and asks for approval before opening a PR.", "Vetted", "Medium", "Required", "Before PR", "Launch Demo Workflow"],
  ["Sales Research Agent", "Finds and enriches leads from public sources.", "Vetted", "Low", "Managed", "Before CRM export", "Preview"],
  ["Support Drafting Agent", "Drafts customer support replies from a knowledge base.", "Vetted", "Medium", "Managed", "Before customer reply", "Preview"],
  ["Invoice Processing Agent", "Extracts and validates invoice data from PDFs.", "Vetted", "Medium", "Managed", "Before accounting export", "Preview"]
];

const auditLogs = [
  ["GitHub Issue Fixer opened PR #341", "approved", "$0.61"],
  ["Sales Research exported 42 leads", "approved", "$1.20"],
  ["Support Drafting generated 8 replies", "reviewed", "$0.44"],
  ["Deploy to production", "blocked by policy", "$0.00"]
];

const policyRules = [
  "Auth changes require approval",
  "CRM exports require approval",
  "Customer messages require approval",
  "Secrets access blocked",
  "Production deploy blocked"
];

export function DemoDashboard() {
  const [state, setState] = useState(null);
  const [launchOpen, setLaunchOpen] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Marketplace");
  const [selectedTrace, setSelectedTrace] = useState(historicalTraces[0]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setState(await apiGet("/runs/current"));
      setError("");
    } catch {
      setError("API offline. Start FastAPI on port 8000 or run docker compose.");
    }
  }, []);

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 1000);
    return () => window.clearInterval(timer);
  }, [load]);

  useEffect(() => {
    if (state?.run?.status === "waiting_approval") setApprovalOpen(true);
    if (["completed", "rejected"].includes(state?.run?.status)) setApprovalOpen(false);
  }, [state?.run?.status]);

  const run = state?.run;
  const events = state?.events || [];
  const testsStatus = useMemo(() => {
    const failed = events.some((event) => event.type === "test" && event.status === "failed");
    const passed = events.some((event) => event.type === "test" && event.status === "success");
    if (passed) return "Passing";
    if (failed) return "1 failing";
    return "Pending";
  }, [events]);

  async function doPost(path) {
    setBusy(true);
    try {
      setState(await apiPost(path));
      setError("");
    } catch {
      setError("Request failed. Check the API service.");
    } finally {
      setBusy(false);
    }
  }

  const runId = run?.id;
  const isComplete = run?.status === "completed";
  const isWaiting = run?.status === "waiting_approval";

  return (
    <div className="min-h-screen">
      <div className="flex">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-black/72 p-4 backdrop-blur-xl lg:block">
          <Link href="/" className="mb-8 flex items-center gap-3 px-2">
            <span className="block h-8 w-8 shrink-0 overflow-hidden rounded-lg shadow-card">
              <img src="/brand/reiops-mark.svg" alt="" className="h-full w-full object-contain" />
            </span>
            <span className="font-display text-lg font-bold">ReiOps</span>
          </Link>
          <nav className="space-y-1">
            {sidebar.map(([label, Icon]) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${activeTab === label ? "bg-panel3 text-white" : "text-muted hover:bg-panel2 hover:text-white"}`}
              >
                <Icon size={17} /> {label}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-4 left-4 right-4 rounded-card border border-line bg-panel p-4">
            <div className="label text-amber2">{state?.meta?.mock ? "Mock demo mode" : "Demo mode"}</div>
            <p className="mt-3 text-sm leading-6 text-muted">Local simulated workspace data only. No real GitHub or model calls.</p>
          </div>
        </aside>

        <main className="w-full lg:pl-64">
          <TopBar mock={state?.meta?.mock} />
          <div className="px-4 py-5 sm:px-6 lg:px-8">
            {state?.meta?.mock ? <div className="mb-4 inline-flex rounded-full border border-amber/30 bg-amber/10 px-3 py-2 font-mono text-xs text-amber2">Mock demo mode</div> : null}
            {error ? <div className="mb-4 rounded-card border border-red/40 bg-red/10 p-4 text-sm text-red">{error}</div> : null}

            <div className="mb-5 flex gap-2 overflow-x-auto lg:hidden">
              {sidebar.map(([label, Icon]) => (
                <button
                  key={label}
                  onClick={() => setActiveTab(label)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm ${activeTab === label ? "border-amber/40 bg-amber/10 text-amber2" : "border-line bg-panel2 text-muted"}`}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>

            {activeTab === "Control Plane" ? (
              <>
                <section className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="label text-amber2">Control Plane</div>
                    <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Control Plane for Managed Agents</h1>
                    <p className="mt-3 max-w-2xl text-muted">Every ReiOps workflow runs through sandboxing, traces, approvals, cost tracking, and audit logs.</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button onClick={() => setLaunchOpen(true)} className="btn btn-primary h-12 px-6">
                      <Play size={17} /> Launch Demo Workflow
                    </button>
                    <button disabled={busy} onClick={() => doPost("/runs/reset")} className={`btn btn-secondary h-12 px-5 ${busy ? "btn-loading" : ""}`}>
                      <RefreshCcw size={16} /> Reset demo
                    </button>
                  </div>
                </section>

                <section className="grid gap-4 xl:grid-cols-[1fr_380px]">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <MetricCard label="Managed workflows" value={run && run.status !== "idle" ? "1" : "0"} sub="GitHub Issue Fixer" tone="green" />
                      <MetricCard label="Approval queue" value={isWaiting ? "1 pending" : "0 pending"} sub={approvalQueueSub(state)} tone={isWaiting ? "amber" : isComplete ? "green" : "faint"} />
                      <MetricCard label="Run cost" value={run ? "$0.61" : "$0.00"} sub="GitHub Issue Fixer demo" tone="amber" />
                      <MetricCard label="Sandboxes" value="1" sub="secure workflow runtime" tone="cyan" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-[.9fr_1.1fr]">
                      <ExplainerCard />
                      <TelegramLayerCard state={state} />
                    </div>

                    <div className="glass-card rounded-product p-4 md:p-5">
                      <div className="flex flex-col gap-4 border-b border-line pb-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="label text-cyan">GitHub Issue #128</div>
                          <h2 className="mt-2 font-display text-2xl font-bold">Fix flaky login timeout test</h2>
                        </div>
                        <StatusBadge status={statusLabel(run?.status)} tone={isComplete ? "green" : isWaiting ? "amber" : run ? "green" : "faint"} />
                      </div>

                      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_.72fr]">
                        <LiveTrace events={events} />
                        <RunSidePanel state={state} testsStatus={testsStatus} />
                      </div>
                    </div>

                    {isComplete ? <FinalResult state={state} onReset={() => doPost("/runs/reset")} /> : null}
                  </div>

                  <aside className="space-y-4">
                    <ActiveAgent run={run} testsStatus={testsStatus} />
                    <ApprovalCard state={state} onApprove={() => doPost(`/runs/${runId}/approve?source=web`)} onReject={() => doPost(`/runs/${runId}/reject`)} onChanges={() => doPost(`/runs/${runId}/request-changes`)} busy={busy} />
                    <RepoCard />
                  </aside>
                </section>
              </>
            ) : (
              <ProductTab
                tab={activeTab}
                state={state}
                selectedTrace={selectedTrace}
                setSelectedTrace={setSelectedTrace}
                onDeploy={async () => { setActiveTab("Control Plane"); await doPost("/runs/start"); }}
                onApprove={() => doPost(`/runs/${runId}/approve?source=web`)}
                onReject={() => doPost(`/runs/${runId}/reject`)}
                onChanges={() => doPost(`/runs/${runId}/request-changes`)}
                busy={busy}
              />
            )}
          </div>
        </main>
      </div>

      {launchOpen ? <LaunchModal onClose={() => setLaunchOpen(false)} onLaunch={async () => { await doPost("/runs/start"); setLaunchOpen(false); }} busy={busy} /> : null}
      {approvalOpen && isWaiting ? (
        <ApprovalModal
          state={state}
          busy={busy}
          onClose={() => setApprovalOpen(false)}
          onApprove={() => doPost(`/runs/${runId}/approve?source=web`)}
          onReject={() => doPost(`/runs/${runId}/reject`)}
          onChanges={() => doPost(`/runs/${runId}/request-changes`)}
        />
      ) : null}
    </div>
  );
}

function approvalSource(state) {
  const source = state?.run?.approved_by;
  if (source === "Telegram") return "Approved via Telegram";
  if (source === "Web") return "Approved via Web";
  if (state?.approval?.status === "approved") return "Approved";
  return "Not approved";
}

function approvalQueueSub(state) {
  if (state?.run?.status === "waiting_approval") return "Policy blocked open_pull_request";
  if (state?.run?.status === "completed") return `Last approval: PR #341 ${approvalSource(state).toLowerCase()}`;
  if (state?.run?.status === "rejected") return "Last decision: PR creation rejected";
  return "No blocked actions";
}

function TopBar({ mock = false }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-black/72 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 lg:hidden">
          <span className="block h-8 w-8 shrink-0 overflow-hidden rounded-lg shadow-card">
            <img src="/brand/reiops-mark.svg" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="font-display font-bold">ReiOps</span>
        </Link>
        <div className="hidden items-center gap-3 lg:flex">
          <span className="font-display text-lg font-bold">ReiOps</span>
          <ChevronRight size={16} className="text-faint" />
          <span className="font-mono text-xs text-muted">Workspace: Demo Engineering</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-line px-3 py-2 font-mono text-xs text-green sm:inline-flex">GitHub connected</span>
          <span className="rounded-full border border-amber/35 bg-amber/10 px-3 py-2 font-mono text-xs text-amber2">
            {mock ? "Mock demo mode" : "Demo mode"}
          </span>
        </div>
      </div>
    </header>
  );
}

function MetricCard({ label, value, sub, tone }) {
  const color = tone === "green" ? "text-green" : tone === "amber" ? "text-amber" : tone === "cyan" ? "text-cyan" : "text-faint";
  return (
    <div className="rounded-card border border-line bg-panel2 p-5 shadow-card">
      <div className="font-mono text-[10px] uppercase text-faint">{label}</div>
      <div className={`mt-3 font-display text-2xl font-bold ${color}`}>{value}</div>
      <div className="mt-2 text-sm text-muted">{sub}</div>
    </div>
  );
}

function StatusBadge({ status, tone = "faint" }) {
  const color = tone === "green" ? "text-green border-green/30 bg-green/10" : tone === "amber" ? "text-amber border-amber/30 bg-amber/10" : tone === "red" ? "text-red border-red/30 bg-red/10" : "text-muted border-line bg-panel2";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 font-mono text-xs ${color}`}>
      <span className="status-dot" /> {status}
    </span>
  );
}

function LiveTrace({ events }) {
  return (
    <div className="terminal-card rounded-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl font-bold">Live agent trace</h3>
        <span className="font-mono text-xs text-faint">{events.length}/11 events</span>
      </div>
      <div className="min-h-[428px] space-y-3">
        {events.length === 0 ? (
          <div className="grid min-h-[360px] place-items-center rounded-card border border-dashed border-line text-center text-sm text-muted">
            Launch the demo agent to stream execution events.
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="rounded-xl border border-line bg-black/30 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-faint">[{event.timestamp_label}]</span>
                <span className="rounded-lg border border-line bg-panel3 px-2 py-1 font-mono text-[10px] uppercase text-muted">{event.type}</span>
                <span className={`ml-auto inline-flex items-center gap-2 font-mono text-xs ${statusColor[event.status] || "text-muted"}`}>
                  <span className="status-dot" /> {event.status}
                </span>
              </div>
              <div className="mt-3 text-sm text-white">{event.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function RunSidePanel({ state, testsStatus }) {
  const run = state?.run;
  return (
    <div className="space-y-4">
      <div className="rounded-card border border-line bg-panel2 p-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Fact label="Files changed" value={`${state?.files_changed?.length || 0}`} />
          <Fact label="Commands run" value={`${state?.commands_run?.length || 0}`} />
          <Fact label="Cost" value={run ? `$${Number(state.cost_usd || 0).toFixed(2)}` : "$0.00"} />
          <Fact label="Tokens" value={state?.tokens_label || "0"} />
          <Fact label="Risk" value={state?.risk || "Medium"} />
          <Fact label="Tests" value={testsStatus} />
          <Fact label="Model" value={state?.model || "coding-agent"} />
          <Fact label="Status" value={statusLabel(run?.status)} />
        </div>
      </div>
      <ListBlock title="Files changed" icon={FileCode2} items={state?.files_changed || []} />
      <ListBlock title="Commands run" icon={TerminalSquare} items={state?.commands_run || []} mono />
      <div className="rounded-card border border-line bg-panel p-4">
        <div className="label text-amber2">Diff preview</div>
        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl border border-line bg-black/35 p-4 font-mono text-xs leading-6 text-muted">
          {(state?.diff_preview || []).join("\n")}
        </pre>
      </div>
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-black/25 p-3">
      <div className="font-mono text-[10px] uppercase text-faint">{label}</div>
      <div className="mt-2 font-semibold text-white">{value}</div>
    </div>
  );
}

function ListBlock({ title, icon: Icon, items, mono = false }) {
  return (
    <div className="rounded-card border border-line bg-panel2 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon size={16} className="text-cyan" />
        <h3 className="font-display text-lg font-bold">{title}</h3>
      </div>
      <div className={`space-y-2 text-sm text-muted ${mono ? "font-mono" : ""}`}>
        {items.map((item) => <div key={item}>{item}</div>)}
      </div>
    </div>
  );
}

function ExplainerCard() {
  return (
    <div className="rounded-card border border-line bg-panel2 p-5 shadow-card">
      <div className="label text-amber2">Why ReiOps?</div>
      <h3 className="mt-3 font-display text-2xl font-bold">Safe managed workflows.</h3>
      <p className="mt-3 text-sm leading-6 text-muted">
        AI agents are cheap and abundant, but businesses need vetted workflows, secure sandboxes, monitoring, approvals, audit logs, and support.
      </p>
      <p className="mt-4 rounded-xl border border-line bg-black/25 p-3 text-sm font-semibold text-white">
        ReiOps turns random agents and scripts into managed business workflows.
      </p>
    </div>
  );
}

function TelegramLayerCard({ state }) {
  const approvedByTelegram = state?.run?.approved_by === "Telegram";
  return (
    <div className="rounded-card border border-line bg-panel2 p-5 shadow-card">
      <div className="label text-cyan">Telegram operator layer connected</div>
      <h3 className="mt-3 font-display text-2xl font-bold">{approvedByTelegram ? "Approved via Telegram" : "Demo integration"}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">Critical approvals can be handled from Telegram, while the dashboard keeps the shared trace and approval state in sync.</p>
    </div>
  );
}

function ProductTab({ tab, state, selectedTrace, setSelectedTrace, onDeploy, onApprove, onReject, onChanges, busy }) {
  if (tab === "Marketplace") return <MarketplaceTab onDeploy={onDeploy} busy={busy} />;
  if (tab === "Deployments") return <DeploymentsTab state={state} />;
  if (tab === "Audit Logs") return <AuditLogsTab />;
  if (tab === "Approvals") return <ApprovalsTab state={state} onApprove={onApprove} onReject={onReject} onChanges={onChanges} busy={busy} />;
  if (tab === "Policies") return <PoliciesTab />;
  if (tab === "Support") return <SupportTab />;
  return <TracesTab selectedTrace={selectedTrace} setSelectedTrace={setSelectedTrace} />;
}

function TabHeader({ eyebrow, title, body }) {
  return (
    <section className="mb-5">
      <div className="label text-amber2">{eyebrow}</div>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{body}</p>
    </section>
  );
}

function MarketplaceTab({ onDeploy, busy }) {
  return (
    <>
      <TabHeader
        eyebrow="Marketplace"
        title="ReiOps makes AI agents safe for businesses."
        body="Deploy vetted AI workflows in secure sandboxes with monitoring, approval gates, audit logs, and managed support."
      />
      <div className="mb-4 rounded-card border border-amber/25 bg-amber/10 p-5">
        <div className="label text-amber2">ReiOps makes AI agents safe for businesses.</div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          ReiOps packages vetted AI workflows with sandboxing, monitoring, approval gates, audit logs, and managed support.
        </p>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {marketplaceWorkflows.map(([name, description, status, risk, sandbox, approval, cta]) => {
          const isGithub = name === "GitHub Issue Fixer";
          return (
            <div key={name} className="glass-card rounded-product p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="label text-cyan">Managed workflow</div>
                  <h2 className="mt-3 font-display text-2xl font-bold">{name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
                </div>
                <StatusBadge status={status} tone="green" />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Fact label="Risk" value={risk} />
                <Fact label="Sandbox" value={sandbox} />
                <Fact label="Approval" value={approval} />
              </div>
              <button
                disabled={busy}
                onClick={isGithub ? onDeploy : undefined}
                className={`btn mt-5 ${isGithub ? "btn-primary" : "btn-secondary opacity-70"}`}
              >
                {cta}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

function DeploymentsTab({ state }) {
  const githubStatus = state?.run?.status === "completed" ? "Completed" : state?.run?.status === "running" ? "Running" : "Running";
  return (
    <>
      <TabHeader
        eyebrow="Deployments"
        title="Managed workflows already operating."
        body="ReiOps runs vetted workflows with sandboxing, health monitoring, approval gates, and managed support."
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="glass-card rounded-product p-5">
          <div className="label text-cyan">Active deployment</div>
          <h2 className="mt-3 font-display text-3xl font-bold">GitHub Issue Fixer</h2>
          <div className="mt-5 space-y-3 text-sm">
            <Row label="Workspace" value="Demo Engineering" />
            <Row label="Status" value={githubStatus} />
            <Row label="SLA" value="Managed" />
            <Row label="Last run" value="PR #341" />
            <Row label="Health" value="Operational" />
          </div>
        </div>
        <div className="rounded-product border border-line bg-panel2 p-5">
          <div className="label text-amber2">Scheduled deployment</div>
          <h2 className="mt-3 font-display text-3xl font-bold">Sales Research Agent</h2>
          <div className="mt-5 space-y-3 text-sm">
            <Row label="Workspace" value="Sales Ops" />
            <Row label="Status" value="Scheduled" />
            <Row label="SLA" value="Managed" />
            <Row label="Next run" value="09:00" />
            <Row label="Health" value="Operational" />
          </div>
        </div>
      </div>
    </>
  );
}

function AuditLogsTab() {
  return (
    <>
      <TabHeader
        eyebrow="Audit Logs"
        title="Every managed workflow leaves evidence."
        body="Business users get a durable history of approvals, blocked actions, spend, and workflow outcomes."
      />
      <div className="glass-card rounded-product p-5">
        <div className="space-y-3">
          {auditLogs.map(([event, status, cost]) => (
            <div key={event} className="grid gap-3 rounded-card border border-line bg-panel p-4 md:grid-cols-[1fr_180px_100px] md:items-center">
              <div className="font-semibold text-white">{event}</div>
              <StatusBadge status={status} tone={status.includes("blocked") ? "red" : "green"} />
              <div className="font-mono text-sm text-amber2">{cost}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PoliciesTab() {
  return (
    <>
      <TabHeader
        eyebrow="Policies"
        title="Policies turn agent work into governed work."
        body="The control plane enforces business rules before workflows touch code, CRMs, customers, secrets, or production."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {policyRules.map((rule) => (
          <div key={rule} className="rounded-card border border-line bg-panel2 p-5 shadow-card">
            <ShieldCheck className="text-amber" size={20} />
            <p className="mt-5 font-display text-xl font-bold">{rule}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SupportTab() {
  return (
    <>
      <TabHeader
        eyebrow="Support"
        title="Managed service behind the workflows."
        body="ReiOps provides one-click managed workflows for small teams, with custom deployment and support options as teams grow."
      />
      <div className="grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
        <div className="glass-card rounded-product p-5">
          <div className="label text-green">Support status</div>
          <h2 className="mt-3 font-display text-3xl font-bold">No open incidents</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Managed by ReiOps with business-hours support and custom support options as teams grow.</p>
        </div>
        <div className="rounded-product border border-line bg-panel2 p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <Fact label="Managed by" value="ReiOps" />
            <Fact label="Support" value="Business hours / custom options" />
            <Fact label="Last health check" value="passed" />
            <Fact label="Security review" value="completed" />
            <Fact label="Agent version" value="v0.3.1" />
            <Fact label="Support status" value="No open incidents" />
          </div>
        </div>
      </div>
    </>
  );
}

function AgentsTab() {
  return (
    <>
      <TabHeader
        eyebrow="Agents"
        title="Scoped agents, not blind autonomy."
        body="Every agent has a role, budget, permissions, and risk policy."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {agentCards.map(([name, role, status, permissionsValue, budget, policy]) => (
          <div key={name} className="glass-card rounded-product p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <div className="font-display text-xl font-bold">{name}</div>
                <div className="mt-1 text-sm text-muted">{role}</div>
              </div>
              <StatusBadge status={status} tone={status === "Active" ? "green" : status === "Locked" ? "red" : "faint"} />
            </div>
            <div className="space-y-3 text-sm">
              <Row label="Permissions" value={permissionsValue} />
              <Row label="Budget" value={budget} />
              <Row label="Risk policy" value={policy} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TracesTab({ selectedTrace, setSelectedTrace }) {
  return (
    <>
      <TabHeader
        eyebrow="Traces"
        title="Every agent run leaves an audit trail."
        body="Trace history captures issue context, tool calls, commands, diffs, tests, approval events, and final PR outcomes."
      />
      <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
        <div className="space-y-3">
          {historicalTraces.map((trace) => (
            <button
              key={trace[0]}
              onClick={() => setSelectedTrace(trace)}
              className={`w-full rounded-card border p-4 text-left transition ${selectedTrace[0] === trace[0] ? "border-amber/35 bg-amber/10" : "border-line bg-panel2 hover:bg-panel3"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-lg font-bold">{trace[0]} {trace[1]}</div>
                  <div className="mt-2 font-mono text-xs text-muted">{trace[3]} - {trace[4]}</div>
                </div>
                <StatusBadge status={trace[2]} tone={trace[2] === "Blocked" ? "red" : "green"} />
              </div>
            </button>
          ))}
        </div>
        <div className="glass-card rounded-product p-5">
          <div className="label text-cyan">Trace detail</div>
          <h2 className="mt-3 font-display text-3xl font-bold">{selectedTrace[0]} {selectedTrace[1]}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {traceDetailSections.map(([title, lines]) => (
              <div key={title} className="rounded-card border border-line bg-panel p-4">
                <h3 className="font-display text-lg font-bold">{title}</h3>
                <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
                  {lines.map((line) => <div key={line}>{line}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ApprovalsTab({ state, onApprove, onReject, onChanges, busy }) {
  const pending = state?.run?.status === "waiting_approval";
  const completed = state?.run?.status === "completed";
  return (
    <>
      <TabHeader
        eyebrow="Approvals"
        title="Risky agent actions stop here."
        body="Policies block sensitive actions until a human operator approves, requests changes, or rejects the action."
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <div className={`rounded-product border p-5 ${pending ? "border-amber/35 bg-amber/10" : "border-line bg-panel2"}`}>
          <div className="label text-amber2">Pending approvals</div>
          <h2 className="mt-4 font-display text-2xl font-bold">{pending ? "Open PR touching authentication logic" : "0 pending"}</h2>
          <div className="mt-4 space-y-3 text-sm">
            <Row label="Repo" value="reiops-demo" />
            <Row label="Agent" value="codex-runner-01" />
            <Row label="Risk" value="Medium" />
            <Row label="Action blocked" value="open_pull_request" />
            <Row label="Policy" value="auth changes require approval" />
          </div>
          {pending ? (
            <div className="mt-5 grid gap-2">
              <button disabled={busy} onClick={onApprove} className={`btn btn-primary ${busy ? "btn-loading" : ""}`}>Approve</button>
              <div className="grid grid-cols-2 gap-2">
                <button disabled={busy} onClick={onChanges} className={`btn btn-warning px-3 text-xs ${busy ? "btn-loading" : ""}`}>Request changes</button>
                <button disabled={busy} onClick={onReject} className={`btn btn-danger px-3 text-xs ${busy ? "btn-loading" : ""}`}>Reject</button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="rounded-product border border-green/25 bg-green/10 p-5">
          <div className="label text-green">Recently approved</div>
          <h2 className="mt-4 font-display text-2xl font-bold">{completed ? "PR #341 opened" : "No recent approval yet"}</h2>
          <p className="mt-3 text-sm leading-6 text-muted">{completed ? approvalSource(state) : "Complete the scripted run to record the latest approval."}</p>
        </div>
        <div className="rounded-product border border-red/30 bg-red/10 p-5">
          <div className="label text-red">Blocked</div>
          <h2 className="mt-4 font-display text-2xl font-bold">Deploy to production</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Reason: demo agent has no deploy permission.</p>
        </div>
      </div>
    </>
  );
}

function ReposTab() {
  const rules = ["/auth/** approval required", "/payments/** approval required", "/infra/** approval required", "/docs/** auto-PR allowed"];
  return (
    <>
      <TabHeader
        eyebrow="Repos"
        title="GitHub-first policies for agent work."
        body="Repo policies define what agents can read, edit, approve, and ship."
      />
      <div className="grid gap-4 xl:grid-cols-[.8fr_1.2fr]">
        <div className="glass-card rounded-product p-5">
          <div className="label text-cyan">Repo policy</div>
          <h2 className="mt-4 font-display text-3xl font-bold">reiops-demo</h2>
          <div className="mt-5 space-y-3 text-sm">
            <Row label="GitHub" value="connected" />
            <Row label="Default branch" value="main" />
            <Row label="Agent mode" value="branch-only" />
            <Row label="PR approval" value="required" />
            <Row label="Secrets access" value="blocked" />
            <Row label="Deploy access" value="blocked" />
          </div>
        </div>
        <div className="rounded-product border border-line bg-panel2 p-5">
          <div className="label text-amber2">Policy rules</div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {rules.map((rule) => (
              <div key={rule} className="rounded-card border border-line bg-panel p-4 font-mono text-sm text-muted">{rule}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function SettingsTab() {
  const settings = [
    ["BYOK", "Model keys are workspace-owned."],
    ["Telegram approvals", "Send approval requests to team operators."],
    ["Budgets", "Set spend limits per run, repo, or agent."],
    ["Audit retention", "Store traces for review and debugging."],
    ["Webhook/API", "Connect agent CLIs and CI systems."]
  ];
  return (
    <>
      <TabHeader
        eyebrow="Settings"
        title="Team controls for agent operations."
        body="ReiOps centralizes the operational controls teams need before agents touch production workflows."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {settings.map(([title, body]) => (
          <div key={title} className="glass-card rounded-card p-5">
            <div className="label text-amber2">{title}</div>
            <p className="mt-4 text-sm leading-6 text-muted">{body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function ActiveAgent({ run, testsStatus }) {
  return (
    <div className="glass-card rounded-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="label text-cyan">Managed Workflow</div>
        <Activity size={18} className="text-green" />
      </div>
      <div className="space-y-3 text-sm">
        <Row label="Workflow" value="GitHub Issue Fixer" />
        <Row label="Runner" value="codex-runner-01" />
        <Row label="Task" value="Fix flaky login timeout test" />
        <Row label="Repo" value="reiops-demo" />
        <Row label="Source" value="GitHub Issue #128" />
        <Row label="Status" value={statusLabel(run?.status)} />
        <Row label="Cost" value={run ? "$0.61" : "$0.00"} />
        <Row label="Risk" value="Medium" />
        <Row label="Tests" value={testsStatus} />
      </div>
    </div>
  );
}

function ApprovalCard({ state, onApprove, onReject, onChanges, busy }) {
  const pending = state?.run?.status === "waiting_approval";
  const completed = state?.run?.status === "completed";
  return (
    <div className={`rounded-card border p-5 ${pending ? "border-amber/35 bg-amber/10" : completed ? "border-green/25 bg-green/10" : "border-line bg-panel2"}`}>
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle size={18} className={pending ? "text-amber" : completed ? "text-green" : "text-faint"} />
        <div className="label text-amber2">Approval Queue</div>
      </div>
      <h3 className="font-display text-xl font-bold">{pending ? "Policy blocked a risky agent action" : completed ? "Recently approved" : "0 pending"}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">
        {pending
          ? "GitHub Issue Fixer wants to open a PR touching authentication logic."
          : completed
            ? `PR #341 opened - ${approvalSource(state)}.`
            : "No agent action is waiting for review."}
      </p>
      {pending ? (
        <div className="mt-4 grid gap-2">
          <button disabled={busy} onClick={onApprove} className={`btn btn-primary ${busy ? "btn-loading" : ""}`}>Approve PR</button>
          <div className="grid grid-cols-2 gap-2">
            <button disabled={busy} onClick={onChanges} className={`btn btn-warning px-3 text-xs ${busy ? "btn-loading" : ""}`}>Request changes</button>
            <button disabled={busy} onClick={onReject} className={`btn btn-danger px-3 text-xs ${busy ? "btn-loading" : ""}`}>Reject</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RepoCard() {
  return (
    <div className="rounded-card border border-line bg-panel2 p-5">
      <div className="label text-cyan">Connected Repo</div>
      <div className="mt-4 flex items-center gap-3">
        <Github size={22} />
        <div>
          <div className="font-display text-xl font-bold">reiops-demo</div>
          <div className="font-mono text-xs text-green">main - GitHub connected</div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line pb-2 last:border-0 last:pb-0">
      <span className="text-muted">{label}</span>
      <span className="text-right font-mono text-xs text-white">{value}</span>
    </div>
  );
}

function LaunchModal({ onClose, onLaunch, busy }) {
  return (
    <Modal onClose={onClose}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="label text-amber2">Demo workflow</div>
          <h2 className="mt-3 font-display text-3xl font-bold">Launch GitHub Issue Fixer</h2>
        </div>
        <button onClick={onClose} className="rounded-full border border-line p-2 text-muted hover:text-white"><X size={18} /></button>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Fact label="Repository" value="reiops-demo" />
        <Fact label="Source" value="GitHub Issue #128" />
        <Fact label="Issue title" value="Fix flaky login timeout test" />
        <Fact label="Workflow" value="GitHub Issue Fixer" />
        <Fact label="Sandbox" value="Active" />
        <Fact label="Risk policy" value="Approval required before PR" />
        <Fact label="SLA" value="Managed" />
        <Fact label="Budget" value="$2.00" />
        <Fact label="Runner" value="Coding agent" />
      </div>
      <div className="mt-5 rounded-card border border-line bg-panel p-4">
        <div className="label text-cyan">Permissions</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {permissions.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted">
              <CheckCircle2 size={16} className="text-green" /> {item}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button onClick={onClose} className="btn btn-secondary">Cancel</button>
        <button disabled={busy} onClick={onLaunch} className={`btn btn-primary ${busy ? "btn-loading" : ""}`}>Launch Demo Workflow</button>
      </div>
    </Modal>
  );
}

function ApprovalModal({ state, onClose, onApprove, onReject, onChanges, busy }) {
  return (
    <Modal onClose={onClose}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="label text-amber2">Human gate</div>
          <h2 className="mt-3 font-display text-3xl font-bold">Policy blocked a risky agent action</h2>
          <p className="mt-3 text-sm leading-6 text-muted">GitHub Issue Fixer wants to open a PR touching authentication logic.</p>
        </div>
        <button onClick={onClose} className="rounded-full border border-line p-2 text-muted hover:text-white"><X size={18} /></button>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Fact label="Workflow" value="GitHub Issue Fixer" />
        <Fact label="Blocked action" value="open_pull_request" />
        <Fact label="Policy" value="Auth changes require human approval" />
        <Fact label="Sandbox" value="Active" />
        <Fact label="SLA" value="Managed" />
        <Fact label="Risk" value="Medium" />
      </div>
      <div className="mt-5 rounded-card border border-amber/30 bg-amber/10 p-4">
        <div className="label text-amber2">Why this needs approval</div>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
          <li>touches authentication/session logic</li>
          <li>changes test behavior</li>
          <li>opens PR into main workflow</li>
        </ul>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted">{state?.agent_summary}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <ListBlock title="Files changed" icon={FileCode2} items={state?.files_changed || []} />
        <ListBlock title="Tests" icon={TerminalSquare} items={["npm test passing", "npm run lint passing"]} />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button disabled={busy} onClick={onReject} className={`btn btn-danger ${busy ? "btn-loading" : ""}`}>Reject</button>
        <button disabled={busy} onClick={onChanges} className={`btn btn-warning ${busy ? "btn-loading" : ""}`}>Request changes</button>
        <button disabled={busy} onClick={onApprove} className={`btn btn-primary ${busy ? "btn-loading" : ""}`}>Approve PR</button>
      </div>
    </Modal>
  );
}

function FinalResult({ state, onReset }) {
  return (
    <div className="glass-card rounded-product border-green/25 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="label text-green">Final result</div>
          <h2 className="mt-2 font-display text-3xl font-bold">Pull Request #341 opened</h2>
          <p className="mt-2 text-muted">fix: stabilize login timeout handling</p>
        </div>
        <StatusBadge status="Tests passing" tone="green" />
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <Fact label="Human" value={approvalSource(state)} />
        <Fact label="Trace" value="Saved" />
        <Fact label="Cost" value="$0.61" />
        <Fact label="Risk" value="Approved" />
      </div>
      <div className="mt-5 rounded-card border border-line bg-panel p-4">
        <div className="grid gap-3 text-sm md:grid-cols-2">
          <Row label="Repo" value="reiops-demo" />
          <Row label="Branch" value="fix/login-timeout" />
          <Row label="Base" value="main" />
          <Row label="Reviewer" value={approvalSource(state)} />
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/trace/${state?.run?.id}`} className="btn btn-secondary text-center">View Trace</Link>
        <button onClick={onReset} className="btn btn-secondary">Reset demo</button>
        <button onClick={onReset} className="btn btn-primary">Run again</button>
      </div>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/78 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
      <button className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} aria-label="Close modal" />
      <div className="glass-card relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-product p-5 md:p-6">
        {children}
      </div>
    </div>
  );
}
