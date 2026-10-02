import Link from "next/link";
import { Logo } from "@/components/ui/logo";

/** Ft2: one line, hairline above. */
export function SiteFooter({ tone = "night" }: { tone?: "night" | "paper" }) {
  const night = tone === "night";
  const link = `rounded-sm transition-colors ${night ? "hover:text-on-night" : "hover:text-ink"}`;
  return (
    <footer className={`${night ? "bg-night text-night-muted" : "bg-paper text-graphite"} px-5 sm:px-8`}>
      <div className={`mx-auto flex max-w-[1200px] flex-col gap-5 border-t py-8 text-[13px] md:flex-row md:items-center md:justify-between ${night ? "border-night-rule" : "border-rule"}`}>
        <div className="flex items-center gap-4">
          <Logo tone={night ? "night" : "ink"} />
          <span className="hidden sm:inline">Know where your money goes.</span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/#how-it-works" className={link}>
            How it works
          </Link>
          <Link href="/login" className={link}>
            Sign in
          </Link>
          <Link href="/privacy" className={link}>
            Privacy
          </Link>
          <Link href="/terms" className={link}>
            Terms
          </Link>
          <span className="tabular">© {new Date().getFullYear()} Spendly</span>
        </nav>
      </div>
    </footer>
  );
}
