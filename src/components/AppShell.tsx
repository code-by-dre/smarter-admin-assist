import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { TOOLS } from "@/lib/tools";

export function AppShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <div className="flex min-h-screen">
        <aside className="hidden w-[248px] shrink-0 flex-col border-r border-line bg-surface md:flex">
          <div className="flex h-16 items-center gap-2.5 px-5">
            <div className="grid size-7 place-items-center rounded-md bg-brand text-[12px] font-semibold text-paper">
              SA
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold">Smart Admin Assist</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
                AI workplace co-pilot
              </p>
            </div>
          </div>

          <nav className="flex-1 px-3 py-2">
            <p className="px-2 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              Tools
            </p>
            {TOOLS.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                activeOptions={{ exact: tool.to === "/" }}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-muted hover:bg-paper"
                activeProps={{ className: "bg-brand text-paper hover:bg-brand" }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`size-1.5 rounded-full ${isActive ? "bg-teal" : "bg-line"}`}
                    />
                    {tool.label}
                  </>
                )}
              </Link>
            ))}

            <div className="mt-4 border-t border-line pt-4">
              <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                Workspace
              </p>
              <p className="px-2.5 py-2 text-[12px] leading-relaxed text-muted">
                Outputs stay in this session. Nothing is sent on your behalf.
              </p>
            </div>
          </nav>

          <div className="border-t border-line px-3 py-3">
            <div className="flex items-center gap-2.5 px-2">
              <div className="grid size-8 place-items-center rounded-full bg-tealsoft text-[11px] font-semibold text-teal">
                DK
              </div>
              <div className="leading-tight">
                <p className="text-[12px] font-medium">Dana Kroll</p>
                <p className="text-[11px] text-muted">Product team</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-16 items-center justify-between gap-4 border-b border-line bg-surface/80 px-4 backdrop-blur-sm sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid size-7 shrink-0 place-items-center rounded-md bg-brand text-[12px] font-semibold text-paper md:hidden">
                O
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted">{eyebrow}</p>
                <h1 className="truncate text-[15px] font-semibold leading-tight">{title}</h1>
              </div>
            </div>
            <div className="hidden shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[12px] text-muted ring-1 ring-line sm:flex">
              <span className="size-1.5 rounded-full bg-teal" />
              Model · Lovable AI
            </div>
          </div>

          <div className="flex gap-1.5 overflow-x-auto border-b border-line bg-surface px-4 py-2 md:hidden">
            {TOOLS.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                activeOptions={{ exact: tool.to === "/" }}
                className="shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium text-muted ring-1 ring-line"
                activeProps={{ className: "bg-brand text-paper ring-brand" }}
              >
                {tool.short}
              </Link>
            ))}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
