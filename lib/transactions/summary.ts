import type { Transaction } from "@/types/transaction";

// Totals are always derived from rows, never stored. Amounts are summed in
// centavos to avoid floating point drift.

const toCents = (n: number) => Math.round(Number(n) * 100);

export function summarize(transactions: Transaction[]) {
  let income = 0;
  let expenses = 0;
  for (const t of transactions) {
    if (t.type === "income") income += toCents(t.amount);
    else expenses += toCents(t.amount);
  }
  return { income: income / 100, expenses: expenses / 100, balance: (income - expenses) / 100 };
}

export function spendingByCategory(transactions: Transaction[]) {
  const totals = new Map<string, number>();
  for (const t of transactions) {
    if (t.type !== "expense") continue;
    totals.set(t.category, (totals.get(t.category) ?? 0) + toCents(t.amount));
  }
  return [...totals.entries()]
    .map(([category, cents]) => ({ category, amount: cents / 100 }))
    .sort((a, b) => b.amount - a.amount);
}

/** Cumulative expenses for each day of the month, for the spending curve. */
export function cumulativeDailySpending(transactions: Transaction[], monthStart: string, days: number) {
  const perDay = new Array<number>(days).fill(0);
  const prefix = monthStart.slice(0, 7);
  for (const t of transactions) {
    if (t.type !== "expense" || !t.transaction_date.startsWith(prefix)) continue;
    const day = Number(t.transaction_date.slice(8, 10));
    perDay[day - 1] += toCents(t.amount);
  }
  let running = 0;
  return perDay.map((cents, i) => {
    running += cents;
    return { day: i + 1, spent: cents / 100, total: running / 100 };
  });
}
