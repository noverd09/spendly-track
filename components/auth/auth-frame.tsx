import type { ReactNode } from "react";
import { NightSky } from "@/components/marketing/night-sky";
import { Logo } from "@/components/ui/logo";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/** Split screen: night panel with the brand line, paper panel with the form. */
export function AuthFrame({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <aside className="relative isolate flex flex-col justify-between overflow-hidden bg-night px-6 py-6 text-on-night sm:px-10 lg:py-10">
        <NightSky intensity="soft" />
        <Logo tone="night" />
        <div className="hidden lg:block">
          <p className="max-w-[16ch] text-[44px] font-semibold leading-[1.04] tracking-[-0.035em]">Know where your money goes.</p>
          <p className="mt-4 max-w-[40ch] text-night-muted">Record income and expenses in seconds and see the month at a glance.</p>
        </div>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.1em] text-night-muted lg:block">Private by default · Your data, only yours</p>
      </aside>

      <main className="flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[400px] animate-rise">
          <h1 className="text-[28px] font-semibold tracking-[-0.025em]">{title}</h1>
          <p className="mt-1.5 text-[15px] text-graphite">{subtitle}</p>
          {!isSupabaseConfigured ? (
            <p role="status" className="mt-6 rounded-md border border-rule bg-paper-sunken px-3 py-2.5 text-[13px] text-graphite">
              Accounts open soon — Spendly&rsquo;s database isn&rsquo;t connected on this deployment yet.
            </p>
          ) : null}
          <div className="mt-8">{children}</div>
          <div className="mt-8 border-t border-rule pt-6 text-center text-sm text-graphite">{footer}</div>
        </div>
      </main>
    </div>
  );
}
