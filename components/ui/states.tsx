import type { ReactNode } from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`animate-pulse-soft rounded-md bg-paper-sunken ${className}`} />;
}

/** Line drawing + one sentence + one action. */
export function EmptyState({
  title,
  body,
  action,
  art = "ledger",
  compact = false,
}: {
  title: string;
  body: string;
  action?: ReactNode;
  art?: "ledger" | "chart" | "search";
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${compact ? "px-4 py-8" : "px-6 py-14"}`}>
      <EmptyArt kind={art} />
      <h3 className="mt-5 text-[15px] font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-[34ch] text-sm text-graphite">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

function EmptyArt({ kind }: { kind: "ledger" | "chart" | "search" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 96 64" aria-hidden className="h-16 w-24 text-ink/30">
      {kind === "ledger" && (
        <>
          <rect x="18" y="8" width="60" height="48" rx="6" {...common} />
          <path d="M28 22h26M28 32h34M28 42h20" {...common} />
          <circle cx="68" cy="22" r="3" className="fill-ember-glow" stroke="none" />
        </>
      )}
      {kind === "chart" && (
        <>
          <path d="M14 52h68" {...common} />
          <path d="M22 44c8 0 10-14 18-14s10 8 18 8 10-18 18-18" {...common} strokeDasharray="3 4" />
          <circle cx="76" cy="20" r="3" className="fill-ember-glow" stroke="none" />
        </>
      )}
      {kind === "search" && (
        <>
          <circle cx="42" cy="30" r="14" {...common} />
          <path d="M52 40l12 12" {...common} />
          <path d="M36 30h12" {...common} />
        </>
      )}
    </svg>
  );
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="rounded-md border border-brick/25 bg-brick-tint px-3 py-2.5 text-sm text-brick">
      {children}
    </div>
  );
}
