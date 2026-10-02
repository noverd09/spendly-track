"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LayoutGrid, LogOut, Plus, ReceiptText, Settings } from "lucide-react";
import { Logo, LogoMark } from "@/components/ui/logo";
import { useTransactionDialogs } from "@/components/transactions/transaction-dialogs";
import { signOut } from "@/lib/auth/actions";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/transactions", label: "Transactions", icon: ReceiptText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

function useActive() {
  const pathname = usePathname();
  return (href: string) => (href === "/dashboard" ? pathname === href : pathname.startsWith(href));
}

export function AppShell({ email, children }: { email: string; children: ReactNode }) {
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[72px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-on-ink">
        Skip to content
      </a>
      <Sidebar email={email} />
      <MobileHeader />
      <main id="main" className="min-w-0 px-4 pb-32 pt-5 sm:px-6 md:px-8 md:pb-16 md:pt-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1080px]">{children}</div>
      </main>
      <MobileTabBar />
    </div>
  );
}

function Sidebar({ email }: { email: string }) {
  const isActive = useActive();
  const initial = email.charAt(0).toUpperCase() || "S";

  return (
    <aside className="sticky top-0 hidden h-dvh flex-col border-r border-rule bg-paper-raised md:flex">
      <div className="flex h-16 items-center px-5 lg:px-6">
        <div className="hidden lg:block">
          <Logo href="/dashboard" />
        </div>
        <Link href="/dashboard" aria-label="Spendly dashboard" className="text-ink lg:hidden">
          <LogoMark className="size-7" />
        </Link>
      </div>

      <nav aria-label="Main" className="mt-4 flex flex-col gap-1 px-3">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              title={label}
              className={`group flex h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold transition-colors duration-[120ms] max-lg:justify-center ${
                active ? "bg-ink text-on-ink" : "text-graphite hover:bg-paper-sunken hover:text-ink"
              }`}
            >
              <Icon aria-hidden className="size-5 shrink-0" strokeWidth={1.75} />
              <span className="max-lg:sr-only">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-rule p-3">
        <div className="flex items-center gap-3 px-2 py-2 max-lg:justify-center">
          <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-paper-sunken text-[13px] font-semibold">
            {initial}
          </span>
          <span className="min-w-0 truncate text-[13px] text-graphite max-lg:hidden" title={email}>
            {email}
          </span>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            title="Log out"
            className="flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm font-semibold text-graphite transition-colors hover:bg-paper-sunken hover:text-ink max-lg:justify-center"
          >
            <LogOut aria-hidden className="size-5 shrink-0" strokeWidth={1.75} />
            <span className="max-lg:sr-only">Log out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}

function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-rule bg-paper/90 px-4 backdrop-blur-md md:hidden">
      <Logo href="/dashboard" />
      <form action={signOut}>
        <button type="submit" className="grid size-10 place-items-center rounded-md text-graphite hover:bg-paper-sunken hover:text-ink" aria-label="Log out">
          <LogOut aria-hidden className="size-5" strokeWidth={1.75} />
        </button>
      </form>
    </header>
  );
}

/** Thumb-reach navigation with the ember add button in the centre. */
function MobileTabBar() {
  const isActive = useActive();
  const { openCreate } = useTransactionDialogs();
  const [dashboard, transactions, settings] = NAV;

  const tab = (item: (typeof NAV)[number]) => {
    const active = isActive(item.href);
    const Icon = item.icon;
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-semibold transition-colors ${active ? "text-ink" : "text-graphite"}`}
      >
        <Icon aria-hidden className="size-[22px]" strokeWidth={active ? 2 : 1.75} />
        {item.label}
      </Link>
    );
  };

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-30 flex items-center rounded-xl border border-rule bg-paper-raised/95 px-2 shadow-float backdrop-blur-md md:hidden"
    >
      {tab(dashboard)}
      {tab(transactions)}
      <div className="flex flex-1 justify-center">
        <button
          type="button"
          onClick={openCreate}
          className="-mt-6 grid size-14 place-items-center rounded-full bg-ember text-on-ember shadow-float ring-4 ring-paper transition-transform duration-[120ms] active:scale-95"
          aria-label="Add transaction"
        >
          <Plus aria-hidden className="size-6" strokeWidth={2} />
        </button>
      </div>
      {tab(settings)}
    </nav>
  );
}
