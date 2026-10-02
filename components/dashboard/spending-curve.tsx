"use client";

import { useId, useState, type KeyboardEvent, type PointerEvent } from "react";
import { formatCompact, formatCurrency } from "@/lib/currency";

type Point = { day: number; spent: number; total: number };

const W = 640;
const H = 220;
const PAD = { top: 20, right: 12, bottom: 28, left: 12 };

/**
 * Cumulative spending through the month, drawn as one ink line.
 * Hover, touch or arrow keys move the marker; the tooltip reads the day.
 */
export function SpendingCurve({ points, monthShort, todayDay }: { points: Point[]; monthShort: string; todayDay: number | null }) {
  const gradientId = useId();
  const visible = todayDay ? points.slice(0, todayDay) : points;
  const max = Math.max(...visible.map((p) => p.total), 1);
  const [active, setActive] = useState(visible.length - 1);

  const x = (i: number) => PAD.left + (i / Math.max(points.length - 1, 1)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - v / max) * (H - PAD.top - PAD.bottom);

  const path = smooth(visible.map((p, i) => [x(i), y(p.total)]));
  const area = `${path} L ${x(visible.length - 1)} ${H - PAD.bottom} L ${x(0)} ${H - PAD.bottom} Z`;
  const point = visible[Math.min(active, visible.length - 1)];

  function fromPointer(e: PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const i = Math.round(((ratio * W - PAD.left) / (W - PAD.left - PAD.right)) * (points.length - 1));
    setActive(Math.min(Math.max(i, 0), visible.length - 1));
  }

  function onKey(e: KeyboardEvent<SVGSVGElement>) {
    if (e.key === "ArrowLeft") setActive((a) => Math.max(a - 1, 0));
    else if (e.key === "ArrowRight") setActive((a) => Math.min(a + 1, visible.length - 1));
    else return;
    e.preventDefault();
  }

  const ticks = [1, Math.ceil(points.length / 2), points.length];
  const tipLeft = (x(active) / W) * 100;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-pan-y select-none outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ember"
        role="img"
        aria-label={`Cumulative spending this month, ${formatCurrency(visible.at(-1)?.total ?? 0)} by ${monthShort} ${visible.length}. Use left and right arrow keys to read each day.`}
        tabIndex={0}
        onPointerMove={fromPointer}
        onPointerDown={fromPointer}
        onKeyDown={onKey}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-ink)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-ink)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={PAD.left} x2={W - PAD.right} y1={PAD.top + f * (H - PAD.top - PAD.bottom)} y2={PAD.top + f * (H - PAD.top - PAD.bottom)} stroke="var(--color-rule)" strokeDasharray="2 6" />
        ))}
        <line x1={PAD.left} x2={W - PAD.right} y1={H - PAD.bottom} y2={H - PAD.bottom} stroke="var(--color-rule)" />
        <path d={area} fill={`url(#${gradientId})`} />
        <path d={path} fill="none" stroke="var(--color-ink)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
        {point ? (
          <g>
            <line x1={x(active)} x2={x(active)} y1={y(point.total)} y2={H - PAD.bottom} stroke="var(--color-ink)" strokeDasharray="3 4" opacity="0.5" />
            <circle cx={x(active)} cy={y(point.total)} r="6.5" fill="var(--color-paper-raised)" stroke="var(--color-ink)" strokeWidth="2.25" />
          </g>
        ) : null}
        {ticks.map((d) => (
          <text key={d} x={x(d - 1)} y={H - 8} textAnchor={d === 1 ? "start" : d === points.length ? "end" : "middle"} className="fill-graphite font-mono text-[11px]">
            {monthShort} {d}
          </text>
        ))}
        <text x={W - PAD.right} y={PAD.top - 6} textAnchor="end" className="fill-graphite font-mono text-[11px]">
          {formatCompact(max)}
        </text>
      </svg>
      {point ? (
        <div
          aria-live="polite"
          className="pointer-events-none absolute top-0 -translate-x-1/2 -translate-y-1/2 rounded-md bg-ink px-2.5 py-1.5 text-center text-on-ink shadow-float"
          style={{ left: `clamp(56px, ${tipLeft}%, calc(100% - 56px))` }}
        >
          <p className="tabular text-[13px] font-semibold leading-none">{formatCurrency(point.total)}</p>
          <p className="mt-1 text-[11px] leading-none text-on-ink/60">
            by {monthShort} {point.day}
            {point.spent > 0 ? ` · ${formatCompact(point.spent)} that day` : ""}
          </p>
        </div>
      ) : null}
    </div>
  );
}

/** Monotone-ish smoothing: cubic segments with horizontal tangents, never overshoots. */
function smooth(pts: number[][]) {
  if (!pts.length) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}
