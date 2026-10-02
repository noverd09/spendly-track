import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";
import { SiteFooter } from "./site-footer";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <header className="px-5 py-6 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Logo />
        </div>
      </header>
      <main id="main" className="px-5 pb-24 pt-10 sm:px-8">
        <article className="mx-auto max-w-[68ch]">
          <h1 className="text-[36px] font-semibold tracking-[-0.03em]">{title}</h1>
          <p className="tabular mt-2 text-[13px] text-graphite">Last updated {updated}</p>
          <div className="mt-10 flex flex-col gap-5 text-[16px] leading-relaxed text-ink/90 [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter tone="paper" />
    </>
  );
}
