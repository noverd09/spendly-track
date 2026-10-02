import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryBars } from "@/components/dashboard/category-bars";
import { Greeting } from "@/components/dashboard/greeting";
import { MonthSwitcher } from "@/components/dashboard/month-switcher";
import { SpendingCurve } from "@/components/dashboard/spending-curve";
import { BalanceCard, SummaryCard } from "@/components/dashboard/summary";
import { AddTransactionButton } from "@/components/transactions/transaction-dialogs";
import { TransactionItem } from "@/components/transactions/transaction-item";
import { EmptyState } from "@/components/ui/states";
import { currentMonthKey, formatMonth, monthRange, parseMonthKey, todayISO } from "@/lib/dates";
import { getCurrentUser } from "@/lib/supabase/server";
import { getTransactionsBetween } from "@/lib/transactions/queries";
import { cumulativeDailySpending, spendingByCategory, summarize } from "@/lib/transactions/summary";

export const metadata = { title: "Dashboard" };

function displayName(email: string) {
  const first = email.split("@")[0].split(/[._\-+0-9]/).find(Boolean) ?? "there";
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export default async function DashboardPage({ searchParams }: PageProps<"/dashboard">) {
  const params = await searchParams;
  const month = parseMonthKey(typeof params.month === "string" ? params.month : null) ?? currentMonthKey();
  const user = (await getCurrentUser())!;
  const { start, end, days } = monthRange(month);
  const transactions = await getTransactionsBetween(user.id, start, end);

  const totals = summarize(transactions);
  const categories = spendingByCategory(transactions);
  const isCurrentMonth = month === currentMonthKey();
  const todayDay = isCurrentMonth ? Number(todayISO().slice(8, 10)) : null;
  const curve = cumulativeDailySpending(transactions, start, days);
  const monthLabel = formatMonth(month);
  const monthShort = monthLabel.slice(0, 3);
  const recent = transactions.slice(0, 6);

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <header className="flex animate-rise flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Greeting name={displayName(user.email)} />
          <p className="mt-1 text-[15px] text-graphite">Here&rsquo;s your financial overview.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <MonthSwitcher month={month} />
          <AddTransactionButton className="hidden md:inline-flex" />
        </div>
      </header>

      {/* Balance · Income · Expenses */}
      <div className="grid animate-rise grid-cols-2 gap-3 [animation-delay:60ms] md:gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="col-span-2 lg:col-span-1">
          <BalanceCard balance={totals.balance} income={totals.income} expenses={totals.expenses} monthLabel={monthLabel} />
        </div>
        <SummaryCard kind="income" amount={totals.income} />
        <SummaryCard kind="expense" amount={totals.expenses} />
      </div>

      {!transactions.length ? (
        <section className="animate-rise rounded-lg border border-rule bg-paper-raised [animation-delay:120ms]">
          <EmptyState
            title={isCurrentMonth ? "Your finances are waiting for their first entry." : `Nothing recorded in ${monthLabel}.`}
            body={isCurrentMonth ? "Add your first transaction to start tracking your money." : "Pick another month, or add a transaction dated in this one."}
            action={<AddTransactionButton />}
          />
        </section>
      ) : (
        <>
          {/* Spending overview · Recent transactions */}
          <div className="grid animate-rise gap-4 [animation-delay:120ms] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <section aria-labelledby="overview-title" className="rounded-lg border border-rule bg-paper-raised p-5 sm:p-6">
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h2 id="overview-title" className="text-base font-semibold tracking-[-0.01em]">
                  Spending overview
                </h2>
                <p className="text-[13px] text-graphite">Running total · {monthLabel}</p>
              </div>
              {totals.expenses > 0 ? (
                <div className="pt-8">
                  <SpendingCurve key={month} points={curve} monthShort={monthShort} todayDay={todayDay} />
                </div>
              ) : (
                <EmptyState compact art="chart" title="No spending data yet" body="Add your first expense to see where your money goes." />
              )}
            </section>

            <section aria-labelledby="recent-title" className="flex flex-col rounded-lg border border-rule bg-paper-raised">
              <div className="flex items-center justify-between px-5 pb-2 pt-5 sm:px-6">
                <h2 id="recent-title" className="text-base font-semibold tracking-[-0.01em]">
                  Recent transactions
                </h2>
                <Link href="/dashboard/transactions" className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[13px] font-semibold text-graphite hover:bg-paper-sunken hover:text-ink">
                  View all <ArrowRight aria-hidden className="size-3.5" />
                </Link>
              </div>
              <ul className="divide-y divide-rule">
                {recent.map((t) => (
                  <TransactionItem key={t.id} transaction={t} />
                ))}
              </ul>
            </section>
          </div>

          {/* Spending by category */}
          <section aria-labelledby="category-title" className="animate-rise rounded-lg border border-rule bg-paper-raised p-5 [animation-delay:180ms] sm:p-6">
            <div className="mb-5 flex items-baseline justify-between gap-3">
              <h2 id="category-title" className="text-base font-semibold tracking-[-0.01em]">
                Spending by category
              </h2>
              {categories.length ? <p className="text-[13px] text-graphite">{categories.length} {categories.length === 1 ? "category" : "categories"}</p> : null}
            </div>
            {categories.length ? (
              <CategoryBars data={categories} />
            ) : (
              <EmptyState compact art="chart" title="No spending data yet" body="Add your first expense to see where your money goes." />
            )}
          </section>
        </>
      )}
    </div>
  );
}
