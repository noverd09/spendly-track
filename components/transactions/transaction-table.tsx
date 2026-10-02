"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { ArrowDownUp, Pencil, Search, Trash2, X } from "lucide-react";
import { Select } from "@/components/ui/field";
import { Segmented } from "@/components/ui/segmented";
import { EmptyState } from "@/components/ui/states";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/lib/categories";
import { formatCurrency } from "@/lib/currency";
import { formatDate } from "@/lib/dates";
import { summarize } from "@/lib/transactions/summary";
import type { Transaction } from "@/types/transaction";
import { AddTransactionButton, useTransactionDialogs } from "./transaction-dialogs";
import { CategoryDisc, SignedAmount, TransactionItem } from "./transaction-item";

type TypeFilter = "all" | "income" | "expense";
type Sort = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

const ALL_CATEGORIES = [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])];

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<Sort>("date-desc");
  const deferredQuery = useDeferredValue(query);
  const { openEdit, openDelete } = useTransactionDialogs();

  const categoryOptions = type === "income" ? INCOME_CATEGORIES : type === "expense" ? EXPENSE_CATEGORIES : ALL_CATEGORIES;

  const rows = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const filtered = transactions.filter(
      (t) =>
        (type === "all" || t.type === type) &&
        (category === "all" || t.category === category) &&
        (!q || t.category.toLowerCase().includes(q) || (t.description ?? "").toLowerCase().includes(q)),
    );
    const byDate = (a: Transaction, b: Transaction) =>
      a.transaction_date.localeCompare(b.transaction_date) || a.created_at.localeCompare(b.created_at);
    return filtered.sort((a, b) => {
      switch (sort) {
        case "date-asc":
          return byDate(a, b);
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        default:
          return byDate(b, a);
      }
    });
  }, [transactions, deferredQuery, type, category, sort]);

  const totals = useMemo(() => summarize(rows), [rows]);
  const filtering = Boolean(query.trim()) || type !== "all" || category !== "all";

  function reset() {
    setQuery("");
    setType("all");
    setCategory("all");
  }

  if (!transactions.length) {
    return (
      <div className="rounded-lg border border-rule bg-paper-raised">
        <EmptyState
          title="Your finances are waiting for their first entry."
          body="Add your first transaction to start tracking your money."
          action={<AddTransactionButton />}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-graphite" />
          <label htmlFor="tx-search" className="sr-only">
            Search transactions
          </label>
          <input
            id="tx-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search transactions"
            className="h-10 w-full rounded-md border border-rule bg-paper-raised pl-9 pr-3 text-[15px] placeholder:text-graphite/70 hover:border-rule-strong focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/35"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Segmented
            label="Filter by type"
            size="sm"
            value={type}
            onChange={(v) => {
              setType(v);
              setCategory("all");
            }}
            options={[
              { value: "all", label: "All" },
              { value: "income", label: "Income" },
              { value: "expense", label: "Expenses" },
            ]}
          />
          <div className="w-[9.5rem]">
            <label htmlFor="tx-category-filter" className="sr-only">
              Filter by category
            </label>
            <Select id="tx-category-filter" value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 text-sm">
              <option value="all">All categories</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <div className="w-[9.5rem]">
            <label htmlFor="tx-sort" className="sr-only">
              Sort
            </label>
            <Select id="tx-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-9 text-sm">
              <option value="date-desc">Newest first</option>
              <option value="date-asc">Oldest first</option>
              <option value="amount-desc">Largest amount</option>
              <option value="amount-asc">Smallest amount</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Result line */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-graphite" aria-live="polite">
        <p>
          <span className="tabular text-ink">{rows.length}</span> {rows.length === 1 ? "transaction" : "transactions"}
          {filtering ? " match" : ""}
          {rows.length ? (
            <>
              {" · "}in <span className="tabular text-moss">{formatCurrency(totals.income)}</span>
              {" · "}out <span className="tabular text-ink">{formatCurrency(totals.expenses)}</span>
            </>
          ) : null}
        </p>
        {filtering ? (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-semibold text-ink hover:bg-paper-sunken">
            <X aria-hidden className="size-3.5" /> Clear filters
          </button>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-lg border border-rule bg-paper-raised">
        {!rows.length ? (
          <EmptyState art="search" compact title="No transactions match." body="Try a different search or clear the filters." />
        ) : (
          <>
            {/* Phone + tablet: ledger rows */}
            <ul className="divide-y divide-rule md:hidden">
              {rows.map((t) => (
                <TransactionItem key={t.id} transaction={t} />
              ))}
            </ul>

            {/* Desktop: table */}
            <table className="hidden w-full text-left md:table">
              <caption className="sr-only">Your transactions</caption>
              <thead>
                <tr className="border-b border-rule text-[11px] uppercase tracking-[0.1em] text-graphite [&>th]:px-5 [&>th]:py-3 [&>th]:font-mono [&>th]:font-normal">
                  <th scope="col" className="w-32">
                    <span className="inline-flex items-center gap-1">
                      Date {sort.startsWith("date") ? <ArrowDownUp aria-hidden className="size-3" /> : null}
                    </span>
                  </th>
                  <th scope="col">Description</th>
                  <th scope="col" className="w-44">
                    Category
                  </th>
                  <th scope="col" className="w-44 text-right">
                    Amount
                  </th>
                  <th scope="col" className="w-24">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {rows.map((t) => {
                  const title = t.description || t.category;
                  return (
                    <tr key={t.id} className="group transition-colors duration-[120ms] hover:bg-paper-sunken/60 [&>td]:px-5 [&>td]:py-3">
                      <td className="tabular whitespace-nowrap text-[13px] text-graphite">{formatDate(t.transaction_date)}</td>
                      <td className="max-w-0">
                        <span className="block truncate font-semibold">{t.description || <span className="font-normal text-graphite">No description</span>}</span>
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-2 text-sm">
                          <CategoryDisc category={t.category} type={t.type} className="size-7" />
                          {t.category}
                        </span>
                      </td>
                      <td className="text-right">
                        <SignedAmount amount={t.amount} type={t.type} />
                      </td>
                      <td>
                        <div className="flex justify-end gap-0.5 opacity-0 transition-opacity duration-[120ms] group-focus-within:opacity-100 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => openEdit(t)}
                            className="grid size-8 place-items-center rounded-md text-graphite hover:bg-paper-raised hover:text-ink"
                            aria-label={`Edit ${title}`}
                          >
                            <Pencil aria-hidden className="size-4" strokeWidth={1.75} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openDelete(t)}
                            className="grid size-8 place-items-center rounded-md text-graphite hover:bg-brick-tint hover:text-brick"
                            aria-label={`Delete ${title}`}
                          >
                            <Trash2 aria-hidden className="size-4" strokeWidth={1.75} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
