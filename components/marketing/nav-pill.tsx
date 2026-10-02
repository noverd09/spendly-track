import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo";

/** N5 floating pill: content-sized, detached from the edges. */
export function NavPill() {
  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-3 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-night-rule bg-night-raised/80 p-1.5 pl-4 text-on-night shadow-night backdrop-blur-xl sm:top-4"
    >
      <Link href="/" className="mr-1 inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold tracking-[-0.03em]" aria-label="Spendly home">
        <LogoMark className="size-[18px]" />
        spendly
      </Link>
      <Link href="#how-it-works" className="hidden whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold text-night-muted transition-colors hover:text-on-night sm:block">
        How it works
      </Link>
      <Link href="/login" className="whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold text-night-muted transition-colors hover:text-on-night">
        Sign in
      </Link>
      <ButtonLink href="/signup" size="sm" shape="pill">
        Start tracking
      </ButtonLink>
    </nav>
  );
}
