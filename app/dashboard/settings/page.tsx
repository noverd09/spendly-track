import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/actions";
import { DEFAULT_CURRENCY, formatCurrency } from "@/lib/currency";
import { getCurrentUser } from "@/lib/supabase/server";

export const metadata = { title: "Settings" };

function Row({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        {hint ? <p className="text-[13px] text-graphite">{hint}</p> : null}
      </div>
      <div className="min-w-0 text-[15px] sm:text-right">{children}</div>
    </div>
  );
}

export default async function SettingsPage() {
  const user = (await getCurrentUser())!;

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <header className="animate-rise">
        <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.025em] sm:text-[30px]">Settings</h1>
        <p className="mt-1 text-[15px] text-graphite">Your account and display preferences.</p>
      </header>

      <section aria-labelledby="account-title" className="animate-rise overflow-hidden rounded-lg border border-rule bg-paper-raised [animation-delay:60ms]">
        <h2 id="account-title" className="border-b border-rule px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-graphite sm:px-6">
          Account
        </h2>
        <Row label="Email">
          <span className="block truncate" title={user.email}>
            {user.email}
          </span>
        </Row>
      </section>

      <section aria-labelledby="currency-title" className="animate-rise overflow-hidden rounded-lg border border-rule bg-paper-raised [animation-delay:120ms]">
        <h2 id="currency-title" className="border-b border-rule px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-graphite sm:px-6">
          Currency
        </h2>
        <Row label="Display currency" hint="More currencies are coming in a later version.">
          <span className="font-semibold">
            {DEFAULT_CURRENCY.code} ({DEFAULT_CURRENCY.symbol})
          </span>
          <span className="tabular block text-[13px] text-graphite">e.g. {formatCurrency(1250)}</span>
        </Row>
      </section>

      <section className="animate-rise flex flex-col gap-3 rounded-lg border border-rule bg-paper-raised p-5 [animation-delay:180ms] sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-sm font-semibold">Log out</h2>
          <p className="text-[13px] text-graphite">End your session on this device.</p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="ink" icon={<LogOut aria-hidden className="size-4" />}>
            Log out
          </Button>
        </form>
      </section>
    </div>
  );
}
