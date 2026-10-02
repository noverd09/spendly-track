import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-5 text-center">
      <Logo />
      <div>
        <p className="tabular text-[13px] text-graphite">404</p>
        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.025em]">This page isn&rsquo;t in the ledger.</h1>
        <p className="mt-2 text-graphite">The link may be old, or the page has moved.</p>
      </div>
      <ButtonLink href="/" variant="ink">
        Back to Spendly
      </ButtonLink>
    </main>
  );
}
