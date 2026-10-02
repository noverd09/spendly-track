import { ArrowRight } from "lucide-react";
import { HeroPreview } from "@/components/marketing/product-preview";
import { NavPill } from "@/components/marketing/nav-pill";
import { NightSky } from "@/components/marketing/night-sky";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Workbench } from "@/components/marketing/workbench";
import { ButtonLink } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <NavPill />
      <main id="main">
        {/* Hero — H2 split diptych on the night surface */}
        <section className="relative isolate overflow-hidden bg-night px-5 pb-20 pt-28 text-on-night sm:px-8 sm:pt-36 md:pb-28">
          <NightSky />
          <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
            <div className="animate-rise">
              <h1 className="max-w-[12ch] text-[48px] font-semibold leading-[0.98] tracking-[-0.045em] [overflow-wrap:anywhere] sm:text-[64px] lg:text-[80px]">
                Know where your money goes.
              </h1>
              <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-night-muted sm:text-lg">
                Track income and expenses, understand your spending, and stay in control of your money.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="/signup" size="lg" className="rounded-full pl-6 pr-5">
                  Start tracking <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <ButtonLink href="/login" size="lg" variant="quiet" className="rounded-full text-on-night hover:bg-night-raised hover:text-on-night">
                  Sign in
                </ButtonLink>
              </div>
            </div>
            <div className="animate-rise [animation-delay:140ms]">
              <HeroPreview />
            </div>
          </div>
        </section>

        <Workbench />

        {/* Closing CTA */}
        <section className="relative isolate overflow-hidden bg-night px-5 py-24 text-on-night sm:px-8 md:py-32">
          <NightSky intensity="soft" />
          <div className="mx-auto max-w-[1200px]">
            <h2 className="max-w-[16ch] text-[38px] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-[56px]">Start understanding your money today.</h2>
            <p className="mt-5 max-w-[44ch] text-night-muted">Free to use. Your first transaction takes about ten seconds.</p>
            <ButtonLink href="/signup" size="lg" className="mt-9 rounded-full pl-6 pr-5">
              Create your free account <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
