/** Currency settings live here so a future per-user currency only changes this file. */
export const DEFAULT_CURRENCY = { code: "PHP", locale: "en-PH", label: "Philippine Peso", symbol: "₱" } as const;

const formatter = new Intl.NumberFormat(DEFAULT_CURRENCY.locale, {
  style: "currency",
  currency: DEFAULT_CURRENCY.code,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactFormatter = new Intl.NumberFormat(DEFAULT_CURRENCY.locale, {
  style: "currency",
  currency: DEFAULT_CURRENCY.code,
  notation: "compact",
  maximumFractionDigits: 1,
});

/** ₱1,250.00 */
export function formatCurrency(amount: number) {
  return formatter.format(amount);
}

/** +₱8,500.00 / −₱350.00 — uses a true minus sign. */
export function formatSigned(amount: number, type: "income" | "expense") {
  return `${type === "income" ? "+" : "−"}${formatter.format(Math.abs(amount))}`;
}

/** ₱12.5K — for chart axes only. */
export function formatCompact(amount: number) {
  return compactFormatter.format(amount);
}
