"use client";

import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import { CategoryIcon } from "@/lib/categories";
import { formatSigned } from "@/lib/currency";
import { formatDate } from "@/lib/dates";
import type { Transaction } from "@/types/transaction";
import { useTransactionDialogs } from "./transaction-dialogs";

export function CategoryDisc({ category, type, className = "size-10" }: { category: string; type: Transaction["type"]; className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full ${type === "income" ? "bg-moss-tint text-moss" : "bg-paper-sunken text-ink"} ${className}`}>
      <CategoryIcon category={category} type={type} className="size-[18px]" />
    </span>
  );
}

export function SignedAmount({ amount, type, className = "" }: { amount: number; type: Transaction["type"]; className?: string }) {
  const Arrow = type === "income" ? ArrowUpRight : ArrowDownLeft;
  return (
    <span className={`tabular inline-flex items-center justify-end gap-1 whitespace-nowrap text-[15px] ${type === "income" ? "text-moss" : "text-ink"} ${className}`}>
      <Arrow aria-hidden className="size-3.5 opacity-70" strokeWidth={2} />
      <span className="sr-only">{type === "income" ? "Income" : "Expense"}: </span>
      {formatSigned(amount, type)}
    </span>
  );
}

/** One ledger row. Actions are always visible on touch, revealed on hover/focus with a pointer. */
export function TransactionItem({ transaction, actions = true }: { transaction: Transaction; actions?: boolean }) {
  const { openEdit, openDelete } = useTransactionDialogs();
  const title = transaction.description || transaction.category;

  return (
    <li className="group relative flex items-center gap-3 px-4 py-3 transition-colors duration-[120ms] hover:bg-paper-sunken/60 sm:px-5">
      <CategoryDisc category={transaction.category} type={transaction.type} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-ink">{title}</p>
        <p className="truncate text-[13px] text-graphite">
          {transaction.description ? `${transaction.category} · ` : ""}
          {formatDate(transaction.transaction_date)}
        </p>
      </div>
      <SignedAmount amount={transaction.amount} type={transaction.type} />
      {actions ? (
        <div className="flex shrink-0 items-center gap-0.5 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-[120ms]">
          <button
            type="button"
            onClick={() => openEdit(transaction)}
            className="grid size-9 place-items-center rounded-md text-graphite hover:bg-paper-raised hover:text-ink"
            aria-label={`Edit ${title}`}
          >
            <Pencil aria-hidden className="size-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => openDelete(transaction)}
            className="grid size-9 place-items-center rounded-md text-graphite hover:bg-brick-tint hover:text-brick"
            aria-label={`Delete ${title}`}
          >
            <Trash2 aria-hidden className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      ) : null}
    </li>
  );
}
