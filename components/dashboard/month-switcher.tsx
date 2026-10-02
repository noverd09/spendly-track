import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { currentMonthKey, formatMonth, shiftMonth, type MonthKey } from "@/lib/dates";

/** < September 2026 > — month lives in the URL so it's shareable and back-button friendly. */
export function MonthSwitcher({ month }: { month: MonthKey }) {
  const prev = shiftMonth(month, -1);
  const next = shiftMonth(month, 1);
  const isCurrent = month === currentMonthKey();
  const arrow = "grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-paper-raised";

  return (
    <nav aria-label="Choose month" className="inline-flex items-center gap-1 rounded-full border border-rule bg-paper-sunken/60 p-0.5">
      <Link href={`/dashboard?month=${prev}`} className={arrow} aria-label={`Previous month, ${formatMonth(prev)}`} scroll={false}>
        <ChevronLeft aria-hidden className="size-4" />
      </Link>
      <span className="min-w-[8.5rem] px-1 text-center text-sm font-semibold" aria-current="date">
        {formatMonth(month)}
      </span>
      {isCurrent ? (
        <span className={`${arrow} pointer-events-none opacity-30`} aria-hidden>
          <ChevronRight className="size-4" />
        </span>
      ) : (
        <Link href={`/dashboard?month=${next}`} className={arrow} aria-label={`Next month, ${formatMonth(next)}`} scroll={false}>
          <ChevronRight aria-hidden className="size-4" />
        </Link>
      )}
    </nav>
  );
}
