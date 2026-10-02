export type TransactionType = "income" | "expense";

/** A row of public.transactions as returned by Supabase. */
export type Transaction = {
  id: string;
  user_id: string;
  type: TransactionType;
  /** numeric comes back as a number from PostgREST for numeric(14,2) */
  amount: number;
  category: string;
  description: string | null;
  /** YYYY-MM-DD, no time zone */
  transaction_date: string;
  created_at: string;
  updated_at: string;
};

/** What the client is allowed to send. Ownership is never part of it. */
export type TransactionInput = {
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  transaction_date: string;
};

export type ActionResult = { ok: true } | { ok: false; error: string; fieldErrors?: Partial<Record<keyof TransactionInput, string>> };
