// Transaction dates are plain YYYY-MM-DD strings. Everything here works on the
// parts directly so a user in Manila never sees a date shift from UTC parsing.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export type MonthKey = `${number}-${string}`; // "2026-10"

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Today's date as YYYY-MM-DD in the given time zone (defaults to Manila). */
export function todayISO(timeZone = "Asia/Manila") {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export function currentMonthKey(timeZone = "Asia/Manila"): MonthKey {
  return todayISO(timeZone).slice(0, 7) as MonthKey;
}

export function parseMonthKey(value: string | undefined | null): MonthKey | null {
  if (!value || !/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) return null;
  return value as MonthKey;
}

export function shiftMonth(key: MonthKey, delta: number): MonthKey {
  const [y, m] = key.split("-").map(Number);
  const index = y * 12 + (m - 1) + delta;
  return `${Math.floor(index / 12)}-${pad((index % 12) + 1)}` as MonthKey;
}

/** First and last day of the month, inclusive, as YYYY-MM-DD. */
export function monthRange(key: MonthKey) {
  const [y, m] = key.split("-").map(Number);
  const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return { start: `${key}-01`, end: `${key}-${pad(lastDay)}`, days: lastDay };
}

/** "October 2026" */
export function formatMonth(key: MonthKey) {
  const [y, m] = key.split("-").map(Number);
  return `${MONTHS_LONG[m - 1]} ${y}`;
}

/** "Oct 3, 2026" */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** "Oct 3" */
export function formatShortDate(iso: string) {
  const [, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

export function isValidISODate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}
