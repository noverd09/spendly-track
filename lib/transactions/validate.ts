import { isValidCategory } from "@/lib/categories";
import { isValidISODate } from "@/lib/dates";
import type { TransactionInput } from "@/types/transaction";

type FieldErrors = Partial<Record<keyof TransactionInput, string>>;

export const MAX_AMOUNT = 999_999_999_999.99;
export const MAX_DESCRIPTION = 140;

/**
 * Shared by the form (instant feedback) and the server action (the real gate).
 * Accepts unknown input because server actions can be called with anything.
 */
export function validateTransaction(raw: unknown): { data: TransactionInput; errors: null } | { data: null; errors: FieldErrors } {
  const input = (raw ?? {}) as Record<string, unknown>;
  const errors: FieldErrors = {};

  const type = input.type;
  if (type !== "income" && type !== "expense") errors.type = "Choose income or expense.";

  const amount = typeof input.amount === "number" ? input.amount : Number(String(input.amount ?? "").replace(/,/g, ""));
  if (input.amount === "" || input.amount == null || Number.isNaN(amount)) errors.amount = "Enter an amount.";
  else if (amount <= 0) errors.amount = "Amount must be greater than 0.";
  else if (amount > MAX_AMOUNT) errors.amount = "That amount is too large.";
  else if (Math.abs(amount * 100 - Math.round(amount * 100)) > 1e-6) errors.amount = "Use at most two decimal places.";

  const category = typeof input.category === "string" ? input.category : "";
  if (!category) errors.category = "Choose a category.";
  else if ((type === "income" || type === "expense") && !isValidCategory(type, category)) errors.category = "Choose a category from the list.";

  const description = typeof input.description === "string" ? input.description.trim() : "";
  if (description.length > MAX_DESCRIPTION) errors.description = `Keep it under ${MAX_DESCRIPTION} characters.`;

  const date = typeof input.transaction_date === "string" ? input.transaction_date : "";
  if (!date) errors.transaction_date = "Choose a date.";
  else if (!isValidISODate(date)) errors.transaction_date = "Enter a valid date.";

  if (Object.keys(errors).length) return { data: null, errors };

  return {
    data: {
      type: type as TransactionInput["type"],
      amount: Math.round(amount * 100) / 100,
      category,
      description,
      transaction_date: date,
    },
    errors: null,
  };
}
