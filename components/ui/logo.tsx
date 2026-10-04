import Link from "next/link";

/** Wordmark: lowercase Geist beside the mark — an ember sun setting over the horizon, as in app/icon.svg. */
export function Logo({ tone = "ink", href = "/", className = "" }: { tone?: "ink" | "night"; href?: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-[17px] font-semibold tracking-[-0.03em] ${tone === "night" ? "text-on-night" : "text-ink"} ${className}`}
      aria-label="Spendly home"
    >
      <LogoMark />
      spendly
    </Link>
  );
}

export function LogoMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="4 5 24 24" aria-hidden className={className}>
      <path d="M7.63 16a8.5 8.5 0 0 1 16.74 0z" className="fill-ember-glow" />
      <path d="M6 19.5h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M11.5 24h9" strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round" className="stroke-ember-glow" />
    </svg>
  );
}
