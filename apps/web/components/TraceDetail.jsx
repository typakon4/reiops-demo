"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { apiGet } from "../lib/api";

export function TraceDetail({ runId }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    apiGet("/runs/current").then(setState).catch(() => setState(null));
  }, []);

  const events = state?.events || [];

  return (
    <main className="shell py-8">
      <Link href="/demo" className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted hover:text-white">
        <ArrowLeft size={16} /> Back to dashboard
      </Link>
      <div className="glass-card rounded-product p-6">
        <div className="label text-amber2">Execution trace</div>
        <h1 className="mt-3 font-display text-4xl font-bold">Run {runId}</h1>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_.7fr]">
          <section className="terminal-card rounded-card p-4">
            <h2 className="font-display text-xl font-bold">Timeline</h2>
            <div className="mt-4 space-y-3">
              {events.map((event) => (
                <div key={event.id} className="rounded-xl border border-line bg-black/30 p-4">
                  <div className="font-mono text-xs text-faint">[{event.timestamp_label}] {event.type}</div>
                  <div className="mt-2 text-sm text-white">{event.message}</div>
                </div>
              ))}
            </div>
          </section>
          <aside className="space-y-4">
            <TraceBlock title="Original GitHub issue" lines={["#128 Fix flaky login timeout test", "Login test occasionally times out waiting for session readiness."]} />
            <TraceBlock title="Agent plan" lines={["Read issue context", "Patch timeout race", "Run tests", "Wait for PR approval"]} />
            <TraceBlock title="Commands" lines={state?.commands_run || []} />
            <TraceBlock title="File diffs" lines={state?.diff_preview || []} mono />
            <TraceBlock title="Approval event" lines={[state?.approval?.status || "pending", state?.approval?.summary || "Waiting for run"]} />
          </aside>
        </div>
      </div>
    </main>
  );
}

function TraceBlock({ title, lines, mono = false }) {
  return (
    <div className="rounded-card border border-line bg-panel2 p-4">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <div className={`mt-3 space-y-2 text-sm text-muted ${mono ? "font-mono" : ""}`}>
        {lines.map((line) => <div key={line}>{line}</div>)}
      </div>
    </div>
  );
}
