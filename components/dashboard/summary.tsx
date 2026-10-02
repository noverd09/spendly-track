import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/currency";

/** The ink block. Meter shows how much of this month's income has been spent. */
export function BalanceCard({ balance, income, expenses, monthLabel }: { balance: number; income: number; expenses: number; monthLabel: string }) {
  const spentShare = income > 0 ? Math.min(expenses / income, 1) : expenses > 0 ? 1 : 0;
  const percent = Math.round(spentShare * 100);
  const negative = balance < 0;

  return (
    <section aria-labelledby="balance-label" className="relative isolate overflow-hidden rounded-xl bg-ink p-5 text-on-ink sm:p-6">
      {/* Concentric rings: the reference's card arcs, drawn in ink-on-ink. */}
      <svg aria-hidden viewBox="0 0 200 200" className="absolute -right-16 -top-20 -z-10 size-64 text-on-ink/[0.06]">
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="34" />
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <p id="balance-label" className="text-[13px] text-on-ink/60">
        Balance · {monthLabel}
      </p>
      <p className="tabular mt-2 text-[34px] font-semibold leading-none tracking-[-0.04em] sm:text-[40px]">
        {negative ? "−" : ""}
        {formatCurrency(Math.abs(balance))}
      </p>

      <div className="mt-6">
        <div className="flex items-baseline justify-between text-[12px] text-on-ink/60">
          <span>Spent of income</span>
          <span className="tabular">{income > 0 ? `${percent}%` : "—"}</span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-on-ink/10"
          role="meter"
          aria-label="Share of income spent"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <div className="h-full rounded-full bg-ember transition-[width] duration-[420ms] ease-[var(--ease-out)]" style={{ width: `${Math.max(percent, income > 0 || expenses > 0 ? 2 : 0)}%` }} />
        </div>
      </div>
    </section>
  );
}

export function SummaryCard({ kind, amount }: { kind: "income" | "expense"; amount: number }) {
  const income = kind === "income";
  const Icon = income ? ArrowUpRight : ArrowDownLeft;
  return (
    <section className="flex flex-col justify-between gap-4 rounded-lg border border-rule bg-paper-raised p-5">
      <div className="flex items-center gap-3">
        <span className={`grid size-8 place-items-center rounded-full ${income ? "bg-moss-tint text-moss" : "bg-expense-tint text-ink"}`}>
          <Icon aria-hidden className="size-4" strokeWidth={2} />
        </span>
        <h2 className="text-sm font-semibold">{income ? "Income" : "Expenses"}</h2>
      </div>
      <p className={`tabular whitespace-nowrap text-[clamp(17px,4.6vw,22px)] font-semibold tracking-[-0.03em] sm:text-2xl ${income ? "text-moss" : "text-ink"}`}>
        {amount > 0 ? (income ? "+" : "−") : ""}
        {formatCurrency(amount)}
      </p>
    </section>
  );
}
