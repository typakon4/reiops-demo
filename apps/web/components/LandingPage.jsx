'use client';

import Link from "next/link";

const IconBase = ({ children, className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Activity = (props) => (
  <IconBase {...props}>
    <path d="M22 12h-4l-3 8-6-16-3 8H2" />
  </IconBase>
);
const AlertTriangle = (props) => (
  <IconBase {...props}>
    <path d="m12 3 10 18H2L12 3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </IconBase>
);
const ArrowRight = (props) => (
  <IconBase {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </IconBase>
);
const Bot = (props) => (
  <IconBase {...props}>
    <path d="M12 8V4" />
    <rect x="5" y="8" width="14" height="11" rx="2" />
    <path d="M9 13h.01" />
    <path d="M15 13h.01" />
    <path d="M9 17h6" />
  </IconBase>
);
const CheckCircle2 = (props) => (
  <IconBase {...props}>
    <path d="M21 11.5V12a9 9 0 1 1-5.3-8.2" />
    <path d="m9 12 2 2 7-7" />
  </IconBase>
);
const CircleDollarSign = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10" />
    <path d="M16 9.5A3.5 3.5 0 0 0 12 8c-2.2 0-3.5.9-3.5 2.4 0 3.3 7 1.6 7 5 0 1.5-1.4 2.6-3.8 2.6-1.6 0-3-.5-4-1.5" />
  </IconBase>
);
const Code2 = (props) => (
  <IconBase {...props}>
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </IconBase>
);
const FileCode2 = (props) => (
  <IconBase {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
    <path d="m10 13-2 2 2 2" />
    <path d="m14 17 2-2-2-2" />
  </IconBase>
);
const Fingerprint = (props) => (
  <IconBase {...props}>
    <path d="M2 12a10 10 0 0 1 20 0" />
    <path d="M6 12a6 6 0 0 1 12 0c0 5-2 7-2 9" />
    <path d="M10 13c0 4-1 6-1 8" />
    <path d="M14 13c0 2-.3 3.5-1 5" />
  </IconBase>
);
const GitBranch = (props) => (
  <IconBase {...props}>
    <circle cx="6" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="6" r="3" />
    <path d="M6 9v6" />
    <path d="M9 6h4a5 5 0 0 1 5 5v0" />
  </IconBase>
);
const Github = (props) => (
  <IconBase {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-6.5a5 5 0 0 0-1.4-3.6 4.6 4.6 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6 0C6.6.7 5.5 1 5.5 1a4.6 4.6 0 0 0-.1 3.4A5 5 0 0 0 4 8c0 5 3 6.5 6 6.5a4.8 4.8 0 0 0-1 3.5v4" />
    <path d="M9 18c-4.5 2-5-2-7-2" />
  </IconBase>
);
const KeyRound = (props) => (
  <IconBase {...props}>
    <path d="M2 18a5 5 0 1 0 9-3l9-9 2 2-2 2 2 2-3 3-2-2-3 3" />
    <circle cx="7" cy="17" r="1" />
  </IconBase>
);
const Layers3 = (props) => (
  <IconBase {...props}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </IconBase>
);
const LockKeyhole = (props) => (
  <IconBase {...props}>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <path d="M12 15v2" />
  </IconBase>
);
const Play = (props) => (
  <IconBase {...props}>
    <path d="m8 5 11 7-11 7V5Z" />
  </IconBase>
);
const Radar = (props) => (
  <IconBase {...props}>
    <path d="M13.4 10.6 19 5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M20 12a8 8 0 1 1-8-8" />
    <path d="M16 12a4 4 0 1 1-4-4" />
  </IconBase>
);
const Route = (props) => (
  <IconBase {...props}>
    <circle cx="6" cy="19" r="3" />
    <circle cx="18" cy="5" r="3" />
    <path d="M9 19h5a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h1" />
  </IconBase>
);
const ShieldCheck = (props) => (
  <IconBase {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-5" />
  </IconBase>
);
const SquareTerminal = (props) => (
  <IconBase {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m8 10 3 3-3 3" />
    <path d="M13 16h3" />
  </IconBase>
);
const TimerReset = (props) => (
  <IconBase {...props}>
    <path d="M10 2h4" />
    <path d="M12 14v-4" />
    <path d="M4 13a8 8 0 1 0 2.3-5.7" />
    <path d="M4 6v5h5" />
  </IconBase>
);
const Workflow = (props) => (
  <IconBase {...props}>
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="15" y="15" width="6" height="6" rx="1" />
    <path d="M9 6h4a3 3 0 0 1 3 3v6" />
    <path d="M6 9v6a3 3 0 0 0 3 3h6" />
  </IconBase>
);
const XCircle = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </IconBase>
);

const navItems = [
  ["Product", "#product"],
  ["Workflow", "#workflow"],
  ["Approvals", "#approvals"],
  ["Security", "#security"],
  ["Prototype", "#prototype"],
];

const capabilityCards = [
  {
    title: "Managed Marketplace",
    body: "Deploy curated AI workflows instead of raw agents or random scripts.",
    icon: Activity,
  },
  {
    title: "Secure Sandboxes",
    body: "Run every workflow in a controlled environment with scoped permissions.",
    icon: Route,
  },
  {
    title: "Approval Gates",
    body: "Block risky actions before workflows touch customers, code, CRMs, or production.",
    icon: ShieldCheck,
  },
  {
    title: "Managed Support",
    body: "Add monitoring, audit history, health checks, and SLA-backed support.",
    icon: CircleDollarSign,
  },
];

const problemCards = [
  ["No visibility", "Teams cannot see what agents are doing in real time."],
  ["No control", "Agents can touch files, repos, infra, or secrets without clear approval gates."],
  ["No audit trail", "When something breaks, there is no clean trace of prompts, tools, changes, and decisions."],
  ["No cost ownership", "Token and model spend becomes invisible across a team."],
];

const capabilities = [
  {
    title: "Vetted Workflow Deployment",
    body: "Launch curated workflows such as GitHub Issue Fixer from one managed workspace.",
    icon: Bot,
  },
  {
    title: "Monitoring & Traces",
    body: "Inspect tool calls, terminal commands, file changes, model outputs, and errors.",
    icon: SquareTerminal,
  },
  {
    title: "Human Approval Gates",
    body: "Require review before workflows modify sensitive systems, open PRs, deploy, or touch secrets.",
    icon: Fingerprint,
  },
  {
    title: "GitHub Issue Fixer",
    body: "Turn GitHub issues into sandboxed runs, tested changes, policy approvals, and PRs.",
    icon: Github,
  },
  {
    title: "Audit Logs & Cost Tracking",
    body: "Understand what happened, who approved it, and how much every workflow run costs.",
    icon: CircleDollarSign,
  },
  {
    title: "Managed Support",
    body: "Add support, health checks, and operating procedures around AI workflow adoption.",
    icon: KeyRound,
  },
];

const flow = [
  "Issue",
  "Agent branch",
  "Live trace",
  "Tests",
  "Human approval",
  "Pull request",
  "Review",
];

const traceEvents = [
  ["10:42", "GitHub issue #128 assigned to agent", "source"],
  ["10:43", "Created branch fix/login-timeout", "git"],
  ["10:44", "Edited src/auth/session.ts", "file"],
  ["10:45", "Ran tests - 1 failing", "fail"],
  ["10:47", "Applied fix", "file"],
  ["10:49", "Tests passing", "pass"],
  ["10:50", "Approval required before opening PR", "approval"],
  ["10:52", "Pull request #341 opened", "pr"],
];

const securityBullets = [
  "Approval gates before merge, deploy, secrets, or production changes",
  "Audit logs for every agent action",
  "BYOK for model and workspace credentials",
  "Per-repo and per-agent permissions",
  "Human override for dangerous actions",
];

const proofCards = [
  "Telegram-first control interface",
  "Mini App dashboard",
  "Git-backed workspace",
  "BYOK credentials",
  "Human-in-the-loop controls",
  "Scheduled agent workflows",
];

function withTelegramStartParam(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has("start")) parsed.searchParams.set("start", "demo");
    return parsed.toString();
  } catch {
    return url;
  }
}

const telegramBotUrl = withTelegramStartParam(
  process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || "https://t.me/ReiOps_bot"
);

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeader({ eyebrow, title, body, center = false }) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-amber2/90">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold leading-[1.04] text-warm md:text-5xl">
        {title}
      </h2>
      {body && <p className="mt-5 text-base leading-8 text-muted md:text-lg">{body}</p>}
    </div>
  );
}

function StatusDot({ color = "bg-green" }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-35", color)} />
      <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", color)} />
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={cn("max-w-full rounded-2xl border border-line bg-panel/82 shadow-card backdrop-blur-xl", className)}>
      {children}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-ink">
      <div className="grid-bg pointer-events-none fixed inset-x-0 top-0 h-[760px]" />
      <Header />
      <main>
        <Hero />
        <CapabilityStrip />
        <Problem />
        <Solution />
        <WorkflowSection />
        <TraceDemo />
        <Security />
        <Prototype />
        <DemoCTA />
        <DesignPartners />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/78 backdrop-blur-2xl">
      <nav className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#" className="group flex items-center gap-2.5">
          <span className="block h-9 w-9 shrink-0 overflow-hidden rounded-xl shadow-card">
            <img src="/brand/reiops-mark.svg" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="font-display text-xl font-bold tracking-normal text-warm">ReiOps</span>
        </a>
      <div className="mx-auto hidden items-center gap-2 rounded-full border border-line bg-white/[0.035] px-2 py-1 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted transition hover:bg-white/[0.07] hover:text-warm"
            >
              {label}
            </a>
          ))}
        </div>
      <a
        href="#waitlist"
      className="btn btn-primary hidden h-11 px-5 xl:inline-flex"
      >
          Join Waitlist
          <ArrowRight className="h-4 w-4" />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="product" className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-16 lg:px-8 lg:pb-24 lg:pt-24">
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="mb-6 inline-flex max-w-[calc(100vw-40px)] items-center gap-2 rounded-full border border-white/[0.10] bg-panel2/72 px-2 py-1.5 text-sm font-semibold text-muted shadow-card backdrop-blur-xl">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-green/20 bg-green/10 px-2.5 py-1 text-xs font-bold text-green">
              <StatusDot color="bg-green" />
              Live prototype
            </span>
            <span className="truncate pr-2 text-warm/86">GitHub Issue Fixer workflow</span>
          </div>
        <h1 className="max-w-[310px] font-display text-[36px] font-bold leading-[1.02] tracking-[-0.03em] text-warm sm:hidden">
            <span className="block">ReiOps makes</span>
            <span className="block">AI agents safe</span>
            <span className="block text-white/92">for businesses.</span>
          </h1>
        <h1 className="hidden max-w-4xl font-display text-6xl font-bold leading-[0.98] tracking-[-0.04em] text-warm sm:block lg:text-[82px]">
            ReiOps makes AI agents
            <span className="block text-white/92">safe for businesses.</span>
          </h1>
        <p className="mt-7 max-w-[320px] text-base leading-8 text-muted sm:max-w-3xl sm:text-lg md:text-xl">
            Deploy vetted AI workflows in secure sandboxes with monitoring, approval gates, audit logs, and managed support.
          </p>
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/demo"
            className="btn btn-primary h-14 px-7"
            >
              Try Web Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={telegramBotUrl || undefined}
              aria-disabled={!telegramBotUrl}
              className={cn(
                "btn btn-secondary h-14 px-7",
                !telegramBotUrl && "pointer-events-none opacity-45"
              )}
            >
              <Play className="h-4 w-4" />
              Run Telegram Demo
            </a>
          </div>
        <div className="mt-7 flex max-w-[330px] flex-wrap justify-center gap-2 text-sm text-muted sm:max-w-3xl">
            <span className="rounded-lg bg-white/[0.06] px-3 py-2">Marketplace workflows</span>
            <span className="rounded-lg bg-white/[0.06] px-3 py-2">Secure sandboxes</span>
            <span className="rounded-lg bg-white/[0.06] px-3 py-2">Approval gates</span>
            <span className="rounded-lg bg-white/[0.06] px-3 py-2">Audit logs</span>
            <span className="rounded-lg bg-white/[0.06] px-3 py-2">SLA support</span>
          </div>
      </div>
      <div className="mt-14">
        <HeroDashboard />
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="relative z-10 mx-auto min-w-0 w-full max-w-[350px] overflow-hidden sm:max-w-6xl">
      <div className="absolute -inset-10 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(246,163,19,.18),transparent_62%)] blur-2xl" />
      <Card className="dashboard-mock scanline relative overflow-hidden rounded-[28px] border-white/[0.12] bg-panel2/88 p-2 shadow-glow">
        <div className="flex items-center justify-between rounded-t-[22px] border-b border-line bg-white/[0.035] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red/80" />
            <span className="h-3 w-3 rounded-full bg-amber/80" />
            <span className="h-3 w-3 rounded-full bg-green/80" />
          </div>
          <div className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-faint sm:block">
            workspace / platform-api
          </div>
        </div>
        <div className="grid gap-3 p-3 md:grid-cols-[1.12fr_0.88fr]">
          <div className="rounded-2xl bg-panel p-4 md:p-5">
            <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div className="min-w-0 pr-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber2">Active agent task</p>
                <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-warm md:text-3xl">GitHub Issue Fixer</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  A managed ReiOps workflow that fixes small GitHub issues, runs tests, and asks for approval before opening a PR.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-green/25 bg-green/10 px-3 py-1.5 text-xs font-bold text-green">
                <StatusDot color="bg-green" />
                Running
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-white/[0.035] p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-warm">
                  <Github className="h-4 w-4 text-amber2" />
                  GitHub issue source
                </div>
                <p className="mt-2 font-mono text-xs leading-5 text-muted">
                  #128 auth/login timeout after idle session
                </p>
              </div>
              <div className="rounded-xl border border-line bg-white/[0.035] p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-warm">
                  <GitBranch className="h-4 w-4 text-cyan" />
                  Agent branch
                </div>
                <p className="mt-2 font-mono text-xs leading-5 text-muted">fix/login-timeout</p>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-ink/70">
              <div className="flex items-center justify-between border-b border-line bg-white/[0.025] px-3 py-2">
                <span className="flex items-center gap-2 text-sm font-bold text-warm">
                  <SquareTerminal className="h-4 w-4 text-amber2" />
                  Live trace events
                </span>
                <span className="font-mono text-[11px] text-faint">8 events</span>
              </div>
              <div className="divide-y divide-line">
                {traceEvents.slice(0, 5).map(([time, text, type]) => (
                  <div key={time + text} className="flex items-start gap-3 px-3 py-2 font-mono text-xs">
                    <span className="w-10 shrink-0 text-faint">{time}</span>
                    <span
                      className={cn(
                        "mt-1 h-2 w-2 shrink-0",
                        type === "fail" ? "bg-red" : type === "pass" ? "bg-green" : "bg-amber"
                      )}
                    />
                    <span className="leading-5 text-muted">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl bg-panel p-4">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-amber/35 bg-amber/10 text-amber2">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-start">
                    <h4 className="min-w-0 font-bold leading-snug text-warm">Policy blocked a risky agent action</h4>
                    <span className="shrink-0 whitespace-nowrap rounded-lg border border-amber/35 bg-amber/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-amber2">
                      Medium risk
                    </span>
                  </div>
                  <p className="mt-2 max-w-full text-sm leading-6 text-muted">
                    GitHub Issue Fixer wants to open a PR touching authentication logic.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="h-9 rounded-full bg-amber px-4 text-xs font-extrabold text-ink">
                      Approve PR
                    </button>
                    <button className="h-9 rounded-full bg-white px-4 text-xs font-extrabold text-ink">
                      Inspect diff
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MiniStat icon={CircleDollarSign} label="Cost meter" value="$0.61" note="session total" />
              <MiniStat icon={FileCode2} label="Files changed" value="2" note="+42 / -11" />
              <MiniStat icon={CheckCircle2} label="Tests" value="Passing" note="npm test" tone="green" />
              <MiniStat icon={XCircle} label="Lint" value="1 warning" note="non-blocking" tone="amber" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, note, tone = "amber" }) {
  const color = tone === "green" ? "text-green" : "text-amber2";
  return (
    <div className="min-h-[124px] rounded-2xl bg-panel p-4">
      <Icon className={cn("h-5 w-5", color)} />
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{label}</p>
      <p className="mt-1 font-display text-xl font-bold text-warm">{value}</p>
      <p className="mt-1 text-xs text-muted">{note}</p>
    </div>
  );
}

function CapabilityStrip() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8">
      <div className="grid gap-4 md:grid-cols-4">
        {capabilityCards.map(({ title, body, icon: Icon }) => (
          <div key={title} className="rounded-2xl border border-line bg-panel2/78 p-5 shadow-card">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber/10 text-amber2">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-warm">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="border-y border-line bg-[linear-gradient(180deg,rgba(10,15,13,.72),rgba(0,0,0,.92))] py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <SectionHeader
          eyebrow="Problem"
          title="AI agents are becoming capable. Team operations are not."
          body="Coding agents now write code, run tests, open PRs, and touch infrastructure. But their work is still scattered across CLIs, chat threads, logs, and GitHub branches. Teams need visibility, permissions, audit trails, and approval flows before they can trust agents with real engineering work."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {problemCards.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-line bg-panel p-6 shadow-card">
              <h3 className="font-display text-xl font-bold text-warm">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <SectionHeader
        eyebrow="Core capabilities"
        title="A managed operations layer for vetted AI workflows."
        body="Deploy workflows in secure sandboxes, monitor live execution, inspect audit-ready traces, approve risky actions, and ship reviewed outcomes with managed support."
        center
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map(({ title, body, icon: Icon }) => (
          <div key={title} className="group rounded-2xl border border-line bg-panel2/76 p-6 shadow-card transition hover:border-amber/35 hover:bg-panel3/80">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber/10 text-amber2 transition group-hover:bg-amber/15">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold text-warm">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section id="workflow" className="border-y border-line bg-[radial-gradient(circle_at_50%_0%,rgba(246,163,19,.12),transparent_42%),#020403] py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <SectionHeader
            eyebrow="Workflow"
            title="GitHub Issue #128 to PR #341."
            body="GitHub Issue Fixer follows the path every team understands: GitHub Issue #128, secure sandbox, trace, tests, policy approval, and PR #341."
          />
          <div className="grid gap-3 sm:grid-cols-7">
            {flow.map((item, index) => (
              <div key={item} className="relative">
                <div className="min-h-[116px] rounded-2xl border border-line bg-panel2/82 p-3 shadow-card">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-faint">0{index + 1}</span>
                    {index < flow.length - 1 && <ArrowRight className="hidden h-4 w-4 text-faint sm:block" />}
                  </div>
                  <p className="text-sm font-extrabold leading-5 text-warm">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TraceDemo() {
  return (
    <section id="trace-demo" className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr]">
        <div>
          <SectionHeader
            eyebrow="Agent trace demo"
            title="Every workflow run becomes inspectable."
            body="ReiOps records the full execution trail: source issue, sandbox events, tool calls, terminal output, files changed, test results, approval events, and final PR."
          />
          <Card className="mt-10 overflow-hidden rounded-[24px]">
            <div className="flex items-center justify-between border-b border-line bg-white/[0.035] px-4 py-3">
              <div className="flex items-center gap-2 font-bold text-warm">
                <SquareTerminal className="h-4 w-4 text-amber2" />
                Trace timeline
              </div>
              <span className="font-mono text-[11px] text-faint">run_2KQ6-FIX-AUTH</span>
            </div>
            <div className="divide-y divide-line bg-panel">
              {traceEvents.map(([time, text, type]) => (
                <div key={time + text} className="grid grid-cols-[64px_18px_1fr] gap-3 px-4 py-3 font-mono text-sm">
                  <span className="text-faint">[{time}]</span>
                  <span
                    className={cn(
                      "mt-1.5 h-2.5 w-2.5",
                      type === "fail"
                        ? "bg-red"
                        : type === "pass" || type === "pr"
                          ? "bg-green"
                          : type === "approval"
                            ? "bg-amber"
                            : "bg-cyan"
                    )}
                  />
                  <span className="leading-6 text-muted">{text}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <TraceDetails />
      </div>
    </section>
  );
}

function TraceDetails() {
  const details = [
    ["Files changed", "2", FileCode2],
    ["Commands run", "npm test, npm run lint", Code2],
    ["Cost", "$0.61", CircleDollarSign],
    ["Risk", "Medium", AlertTriangle],
    ["Approval", "Required before PR", LockKeyhole],
  ];
  return (
    <div id="approvals" className="self-end rounded-2xl border border-line bg-panel2/80 p-5 shadow-card">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-amber2">Run details</p>
      <div className="mt-5 divide-y divide-line">
        {details.map(([label, value, Icon]) => (
          <div key={label} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-amber2" />
            <div>
              <p className="text-sm font-bold text-warm">{label}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Security() {
  return (
    <section id="security" className="border-y border-line bg-[linear-gradient(180deg,#000000,#06100c_55%,#000000)] py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
        <SectionHeader
          eyebrow="Security and trust"
          title="AI workflows need controls, not blind trust."
          body="ReiOps is designed around secure sandboxes, human approval, scoped credentials, audit logs, and managed support so businesses can adopt AI workflows without uncontrolled side channels."
        />
        <Card className="overflow-hidden rounded-[24px] p-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {securityBullets.map((item, index) => (
              <div key={item} className={cn("rounded-2xl bg-panel p-5", index === 0 && "sm:col-span-2")}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                  <p className="text-sm font-semibold leading-6 text-warm">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function Prototype() {
  return (
    <section id="prototype" className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
      <SectionHeader
        eyebrow="Prototype proof"
        title="Built from Rei, our internal agent operating system."
        body="ReiOps grew out of Rei, an internal Telegram-first agent operating system started in late January 2026. The prototype foundation includes a bot interface, Mini App dashboard, Git-backed workspace, BYOK settings, scheduled workflows, and human-in-the-loop controls."
      />
        <div className="grid gap-4 sm:grid-cols-2">
          {proofCards.map((item, index) => {
            const icons = [Bot, Layers3, GitBranch, KeyRound, ShieldCheck, TimerReset];
            const Icon = icons[index];
            return (
              <div key={item} className="rounded-2xl border border-line bg-panel2/78 p-5 shadow-card">
                <Icon className="h-5 w-5 text-amber2" />
                <p className="mt-5 text-sm font-extrabold leading-6 text-warm">{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DemoCTA() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8">
      <div className="overflow-hidden rounded-[28px] border border-line bg-[radial-gradient(circle_at_50%_0%,rgba(246,163,19,.18),transparent_42%),#0a0f0d] p-8 text-center shadow-glow md:p-12">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-amber2">Demo workflow</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.04] text-warm md:text-5xl">
          See ReiOps in action
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
          Deploy a vetted GitHub Issue Fixer workflow, watch the agent run in a secure sandbox, inspect the trace, approve the risky action, and see the final PR.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/demo"
            className="btn btn-primary h-14 px-7"
          >
            Try Web Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={telegramBotUrl || undefined}
            aria-disabled={!telegramBotUrl}
            className={cn(
              "btn btn-secondary h-14 px-7",
              !telegramBotUrl && "pointer-events-none opacity-45"
            )}
          >
            Run Telegram Demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function DesignPartners() {
  return (
    <section id="waitlist" className="px-5 pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-amber/20 bg-[radial-gradient(circle_at_28%_0%,rgba(246,163,19,.22),transparent_38%),#0a0f0d] text-warm shadow-glow">
        <div className="grid gap-px bg-white/[0.08] lg:grid-cols-[1fr_0.42fr]">
          <div className="bg-panel/82 p-8 md:p-12">
            <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-amber2">
              Early design partners
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
              Building with early design partners.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">
              We are looking for AI-native dev teams and agencies already using coding agents in GitHub workflows.
            </p>
          </div>
          <div className="flex items-center bg-panel2/90 p-8 md:p-12">
            <a
              href="mailto:Reiopsmail@gmail.com?subject=ReiOps%20design%20partner%20waitlist"
              className="btn btn-primary h-14 w-full px-6 sm:w-auto"
            >
              Join Design Partner Waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-faint md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3 text-warm">
          <span className="block h-8 w-8 shrink-0 overflow-hidden rounded-lg shadow-card">
            <img src="/brand/reiops-mark.svg" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="font-display font-bold">ReiOps</span>
        </div>
        <p>© 2026 ReiOps</p>
      </div>
    </footer>
  );
}

