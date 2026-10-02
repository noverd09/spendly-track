import { CategoryIcon } from "@/lib/categories";
import { formatCurrency } from "@/lib/currency";

/** Ranked horizontal bars. Ink at falling opacity — labels carry identity, not colour. */
export function CategoryBars({ data }: { data: { category: string; amount: number }[] }) {
  const total = data.reduce((sum, d) => sum + d.amount, 0);
  const max = data[0]?.amount ?? 1;

  return (
    <ol className="flex flex-col gap-4">
      {data.map((d, i) => {
        const share = total ? Math.round((d.amount / total) * 100) : 0;
        return (
          <li key={d.category} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2">
            <div className="flex min-w-0 items-center gap-2.5">
              <CategoryIcon category={d.category} type="expense" className="size-4 shrink-0 text-graphite" />
              <span className="truncate text-sm font-semibold">{d.category}</span>
              <span className="tabular text-[12px] text-graphite">{share}%</span>
            </div>
            <span className="tabular text-sm">{formatCurrency(d.amount)}</span>
            <div className="col-span-2 h-2 overflow-hidden rounded-full bg-paper-sunken" aria-hidden>
              <div
                className="h-full origin-left rounded-full bg-ink"
                style={{ width: `${Math.max((d.amount / max) * 100, 1.5)}%`, opacity: Math.max(1 - i * 0.14, 0.32) }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
