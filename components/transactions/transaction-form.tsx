"use client";

import { useState, useTransition, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { describe, Field, Input, Select } from "@/components/ui/field";
import { Segmented } from "@/components/ui/segmented";
import { ErrorNote } from "@/components/ui/states";
import { categoriesFor } from "@/lib/categories";
import { DEFAULT_CURRENCY } from "@/lib/currency";
import { todayISO } from "@/lib/dates";
import { createTransaction, updateTransaction } from "@/lib/transactions/actions";
import { MAX_DESCRIPTION, validateTransaction } from "@/lib/transactions/validate";
import type { Transaction, TransactionInput, TransactionType } from "@/types/transaction";

type Errors = Partial<Record<keyof TransactionInput, string>>;

/** One form for create and edit. Validates locally, then the server re-validates. */
export function TransactionForm({ transaction, onDone, onCancel }: { transaction?: Transaction; onDone: (message: string) => void; onCancel: () => void }) {
  const [type, setType] = useState<TransactionType>(transaction?.type ?? "expense");
  const [amount, setAmount] = useState(transaction ? transaction.amount.toFixed(2) : "");
  const [category, setCategory] = useState(transaction?.category ?? "");
  const [description, setDescription] = useState(transaction?.description ?? "");
  const [date, setDate] = useState(transaction?.transaction_date ?? todayISO());
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function changeType(next: TransactionType) {
    setType(next);
    // Categories differ per type; keep the choice only if it still exists.
    if (!categoriesFor(next).includes(category)) setCategory("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { type, amount, category, description, transaction_date: date };
    const local = validateTransaction(payload);
    if (!local.data) {
      setErrors(local.errors);
      setFormError(null);
      const first = Object.keys(local.errors)[0];
      document.getElementById(`tx-${first}`)?.focus();
      return;
    }
    setErrors({});
    setFormError(null);

    startTransition(async () => {
      const result = transaction ? await updateTransaction(transaction.id, local.data) : await createTransaction(local.data);
      if (result.ok) onDone(transaction ? "Transaction updated" : "Transaction added");
      else {
        setFormError(result.error);
        if (result.fieldErrors) setErrors(result.fieldErrors);
      }
    });
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <Segmented
        label="Transaction type"
        value={type}
        onChange={changeType}
        className="w-full"
        options={[
          { value: "expense", label: "Expense" },
          { value: "income", label: "Income" },
        ]}
      />

      <Field id="tx-amount" label="Amount" error={errors.amount}>
        <div className="relative">
          <span aria-hidden className="tabular pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-graphite">
            {DEFAULT_CURRENCY.symbol}
          </span>
          <Input
            {...describe("tx-amount", errors.amount)}
            name="amount"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="tabular pl-8 text-lg"
            autoFocus
          />
        </div>
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="tx-category" label="Category" error={errors.category}>
          <Select {...describe("tx-category", errors.category)} name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled>
              Choose…
            </option>
            {categoriesFor(type).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="tx-transaction_date" label="Date" error={errors.transaction_date}>
          <Input
            {...describe("tx-transaction_date", errors.transaction_date)}
            type="date"
            name="transaction_date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>
      </div>

      <Field id="tx-description" label="Description" error={errors.description} hint="Optional — e.g. “Lunch with Ana”">
        <Input
          {...describe("tx-description", errors.description)}
          name="description"
          maxLength={MAX_DESCRIPTION}
          autoComplete="off"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>

      {formError ? <ErrorNote>{formError}</ErrorNote> : null}

      <div className="mt-1 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={pending}>
          Cancel
        </Button>
        <Button type="submit" loading={pending}>
          {pending ? "Saving…" : transaction ? "Save changes" : "Add transaction"}
        </Button>
      </div>
    </form>
  );
}
