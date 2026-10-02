import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

type Variant = "primary" | "ink" | "ghost" | "danger" | "danger-quiet" | "quiet" | "night-quiet";
type Size = "md" | "sm" | "lg" | "icon";

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold select-none " +
  "transition-[background-color,color,border-color,transform,opacity] duration-[120ms] ease-[var(--ease-out)] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-ember text-on-ember hover:bg-ember-hover",
  ink: "bg-ink text-on-ink hover:bg-ink/88",
  ghost: "bg-paper-sunken text-ink hover:bg-rule",
  danger: "bg-brick text-on-ink hover:bg-brick-hover",
  "danger-quiet": "text-brick hover:bg-brick-tint",
  quiet: "text-graphite hover:bg-paper-sunken hover:text-ink",
  "night-quiet": "text-on-night hover:bg-night-raised",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-[15px]",
  icon: "size-10",
};

/** 8px by default (DESIGN.md › Shapes); "pill" only inside pill containers like the nav. */
type Shape = "default" | "pill";

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "", shape: Shape = "default") {
  return `${base} ${variants[variant]} ${sizes[size]} ${shape === "pill" ? "rounded-full" : "rounded-md"} ${extra}`;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size; shape?: Shape; loading?: boolean; icon?: ReactNode };

export function Button({ variant = "primary", size = "md", shape, loading = false, icon, className = "", children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={buttonClass(variant, size, className, shape)}
      disabled={disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size; shape?: Shape };

export function ButtonLink({ variant = "primary", size = "md", shape, className = "", ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, size, className, shape)} {...props} />;
}
