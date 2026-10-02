import type { ComponentProps, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

const control =
  "h-11 w-full rounded-sm border border-rule bg-paper-raised px-3 text-[15px] text-ink placeholder:text-graphite/70 " +
  "transition-[border-color,box-shadow] duration-[120ms] hover:border-rule-strong " +
  "focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/35 " +
  "aria-invalid:border-brick aria-invalid:bg-brick-tint/40 disabled:opacity-60";

export function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[13px] text-brick" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[13px] text-graphite">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return <input className={`${control} ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={`${control} appearance-none pr-9 ${className}`} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-graphite" />
    </div>
  );
}

/** Field-level ARIA wiring in one place. */
export function describe(id: string, error?: string) {
  return { id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined } as const;
}
