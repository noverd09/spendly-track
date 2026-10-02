import { CalendarDays, ChevronDown, LockKeyhole, Search } from "lucide-react";
import { CategoryBars } from "@/components/dashboard/category-bars";
import { TransactionItem } from "@/components/transactions/transaction-item";
import { formatCurrency } from "@/lib/currency";
import { SAMPLE_TRANSACTIONS } from "@/lib/sample-data";
import { spendingByCategory } from "@/lib/transactions/summary";

function Step({ index, title, body, children, flip = false }: { index: string; title: string; body: string; children: React.ReactNode; flip?: boolean }) {
  return (
    <div className={`grid items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] ${flip ? "lg:[&>figure]:order-first lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : ""}`}>
      <div className="max-w-[44ch]">
        <p className="tabular text-[13px] text-graphite">{index}</p>
        <h3 className="mt-2 text-[28px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[32px]">{title}</h3>
        <p className="mt-3 text-[17px] leading-relaxed text-graphite">{body}</p>
      </div>
      <figure className="min-w-0 rounded-xl border border-rule bg-paper-sunken/60 p-3 sm:p-5">{children}</figure>
    </div>
  );
}

/** Static rendering of the add-transaction sheet — illustration, not a form. */
function EntrySketch() {
  return (
    <div aria-hidden className="mx-auto max-w-[420px] rounded-lg border border-rule bg-paper-raised p-5 shadow-float">
      <p className="text-[15px] font-semibold">Add transaction</p>
      <div className="mt-4 flex rounded-full bg-paper-sunken p-1 text-sm font-semibold">
        <span className="flex-1 rounded-full bg-ink py-1.5 text-center text-on-ink">Expense</span>
        <span className="flex-1 py-1.5 text-center text-graphite">Income</span>
      </div>
      <p className="mt-4 text-[13px] font-semibold">Amount</p>
      <p className="tabular mt-1.5 rounded-sm border border-ink px-3 py-2.5 text-lg ring-2 ring-ember/35">₱350.00</p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-[15px]">
        <div>
          <p className="text-[13px] font-semibold">Category</p>
          <p className="mt-1.5 flex items-center justify-between rounded-sm border border-rule px-3 py-2.5">
            Food <ChevronDown className="size-4 text-graphite" />
          </p>
        </div>
        <div>
          <p className="text-[13px] font-semibold">Date</p>
          <p className="mt-1.5 flex items-center justify-between rounded-sm border border-rule px-3 py-2.5">
            Oct 2 <CalendarDays className="size-4 text-graphite" />
          </p>
        </div>
      </div>
      <p className="mt-4 rounded-md bg-ember py-2.5 text-center text-sm font-semibold text-on-ember">Add transaction</p>
    </div>
  );
}

export function Workbench() {
  const categories = spendingByCategory(SAMPLE_TRANSACTIONS).slice(0, 5);
  const list = SAMPLE_TRANSACTIONS.filter((t) => t.type === "expense").slice(0, 4);

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-24 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <h2 id="how-title" className="max-w-[22ch] text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[44px]">
          Three things, done well. Nothing to learn.
        </h2>

        <div className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-24">
          <Step index="01" title="Track everything" body="Record income and expenses in seconds. Type the amount, pick a category, done — the date fills itself in.">
            <EntrySketch />
          </Step>

          <Step flip index="02" title="Understand spending" body="See where your money is going through simple summaries and charts. Your biggest category is always at the top.">
            <div className="rounded-lg border border-rule bg-paper-raised p-5 sm:p-6">
              <div className="mb-5 flex items-baseline justify-between">
                <p className="text-[15px] font-semibold">Spending by category</p>
                <p className="text-[13px] text-graphite">October 2026</p>
              </div>
              <CategoryBars data={categories} />
            </div>
          </Step>

          <Step index="03" title="Stay organized" body="Keep all your transactions in one place. Search, filter by type or category, and fix any entry in two taps.">
            <div className="overflow-hidden rounded-lg border border-rule bg-paper-raised">
              <div aria-hidden className="flex items-center gap-2 border-b border-rule px-4 py-3 text-[15px] text-graphite sm:px-5">
                <Search className="size-4" /> Search transactions
                <span className="ml-auto rounded-full bg-ink px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-on-ink">Expenses</span>
              </div>
              <ul className="divide-y divide-rule">
                {list.map((t) => (
                  <TransactionItem key={t.id} transaction={t} actions={false} />
                ))}
              </ul>
            </div>
          </Step>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-rule pt-10 sm:flex-row sm:items-start sm:gap-6 md:mt-28">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-on-ink">
            <LockKeyhole aria-hidden className="size-5" strokeWidth={1.75} />
          </span>
          <div className="max-w-[60ch]">
            <h3 className="text-lg font-semibold tracking-[-0.01em]">Your numbers stay yours.</h3>
            <p className="mt-1 text-graphite">
              Every transaction is tied to your account and locked at the database level — no other user can read, change or delete it. No bank
              logins, no selling data, no ads. Amounts like {formatCurrency(1250)} are all Spendly ever needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
