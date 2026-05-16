import Link from "next/link";

export function Nav({ app = false }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-black/72 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="block h-8 w-8 shrink-0 overflow-hidden rounded-lg shadow-card">
            <img src="/brand/reiops-mark.svg" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="font-display text-lg font-bold">ReiOps</span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-line bg-panel2/80 p-1 md:flex">
          {["Product", "Workflow", "Approvals", "Security", "Prototype"].map((item) => (
            <a key={item} href={`/#${item.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm text-muted transition hover:text-white">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {app ? (
            <span className="hidden rounded-full border border-line px-3 py-2 font-mono text-xs text-muted sm:inline-flex">
              Demo Engineering
            </span>
          ) : null}
          <Link href="/demo" className="rounded-full bg-amber px-4 py-2 text-sm font-bold text-black transition hover:bg-amber2">
            {app ? "Open Demo" : "Launch Demo"}
          </Link>
        </div>
      </div>
    </header>
  );
}
