import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

type Variant = "primary" | "ink" | "ghost" | "danger" | "quiet" | "light";
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
  quiet: "text-graphite hover:bg-paper-sunken hover:text-ink",
  light: "bg-on-night text-night hover:bg-paper",
};

const sizes: Record<Size, string> = {
  sm: "h-8 rounded-md px-3 text-[13px]",
  md: "h-10 rounded-md px-4 text-sm",
  lg: "h-12 rounded-md px-5 text-[15px]",
  icon: "size-10 rounded-md",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size; loading?: boolean; icon?: ReactNode };

export function Button({ variant = "primary", size = "md", loading = false, icon, className = "", children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={buttonClass(variant, size, className)}
      disabled={disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant = "primary", size = "md", className = "", ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}
