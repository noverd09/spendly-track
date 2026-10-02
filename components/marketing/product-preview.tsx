import { BalanceCard } from "@/components/dashboard/summary";
import { SpendingCurve } from "@/components/dashboard/spending-curve";
import { TransactionItem } from "@/components/transactions/transaction-item";
import { cumulativeDailySpending, summarize } from "@/lib/transactions/summary";
import { SAMPLE_TRANSACTIONS } from "@/lib/sample-data";

/** The hero's proof: real Spendly components rendering a labelled sample month. */
export function HeroPreview() {
  const totals = summarize(SAMPLE_TRANSACTIONS);
  const curve = cumulativeDailySpending(SAMPLE_TRANSACTIONS, "2026-10-01", 31);

  return (
    <figure className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:ml-auto">
      <div className="relative rotate-[-1.5deg] rounded-2xl border border-night-rule bg-paper p-3 shadow-night sm:p-4">
        <BalanceCard balance={totals.balance} income={totals.income} expenses={totals.expenses} monthLabel="October 2026" />
        <div className="mt-3 rounded-lg border border-rule bg-paper-raised px-3 pb-2 pt-10">
          <SpendingCurve points={curve} monthShort="Oct" todayDay={14} />
        </div>
        <ul className="mt-3 divide-y divide-rule overflow-hidden rounded-lg border border-rule bg-paper-raised">
          {SAMPLE_TRANSACTIONS.slice(0, 2).map((t) => (
            <TransactionItem key={t.id} transaction={t} actions={false} />
          ))}
        </ul>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-night-muted lg:text-right">
        Live preview · sample month · try the chart
      </figcaption>
    </figure>
  );
}
