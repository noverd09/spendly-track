import Link from "next/link";

/** Wordmark: lowercase Geist with the ember "sun" as the dot. */
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
    <svg viewBox="0 0 20 20" aria-hidden className={className}>
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
      <path d="M3.2 13.4a7.4 7.4 0 0 1 13.6 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="9" r="3.3" className="fill-ember-glow" />
    </svg>
  );
}
