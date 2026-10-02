"use client";

import { useId, type KeyboardEvent } from "react";

type Option<T extends string> = { value: T; label: string };

/** Radio-group semantics, arrow-key navigation, ink pill for the active option. */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  size = "md",
  className = "",
}: {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "md" | "sm";
  className?: string;
}) {
  const name = useId();

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = options.findIndex((o) => o.value === value);
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = options[(index + delta + options.length) % options.length];
    onChange(next.value);
    event.currentTarget.querySelector<HTMLButtonElement>(`[data-value="${next.value}"]`)?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`inline-flex rounded-full bg-paper-sunken p-1 ${className}`}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            name={name}
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            data-value={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 whitespace-nowrap rounded-full font-semibold transition-colors duration-[120ms] ${
              size === "sm" ? "h-7 px-3 text-[13px]" : "h-9 px-4 text-sm"
            } ${active ? "bg-ink text-on-ink" : "text-graphite hover:text-ink"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
