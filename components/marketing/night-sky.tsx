/**
 * The brand's one atmospheric gesture: an ember "sun" just off-canvas and
 * hairline orbit arcs. Pure CSS + SVG, decorative only.
 */
export function NightSky({ className = "", intensity = "full" }: { className?: string; intensity?: "full" | "soft" }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* the sun */}
      <div
        className="absolute -right-[12%] -top-[28%] aspect-square w-[min(78vw,760px)] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 38% 62%, var(--color-ember-glow) 0%, rgb(242 106 46 / 0.55) 22%, rgb(191 67 24 / 0.18) 46%, transparent 68%)",
          opacity: intensity === "full" ? 0.9 : 0.55,
        }}
      />
      {/* orbit lines */}
      <svg className="orbit-drift absolute -right-[20%] -top-[40%] h-[150%] w-[120%] text-on-night" viewBox="0 0 1000 1000" fill="none">
        {[260, 330, 400, 470, 540, 610].map((r, i) => (
          <circle key={r} cx="800" cy="200" r={r} stroke="currentColor" strokeOpacity={0.09 - i * 0.01} strokeWidth="1" />
        ))}
      </svg>
      {/* grain keeps the dark from banding */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
