import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Transaction } from "@/types/transaction";

const COLUMNS = "id, user_id, type, amount, category, description, transaction_date, created_at, updated_at";

// RLS limits every query to the signed-in user's rows; no user_id filter is
// needed for security, but it keeps the query plan on the (user_id, date) index.

export async function getTransactionsBetween(userId: string, start: string, end: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select(COLUMNS)
    .eq("user_id", userId)
    .gte("transaction_date", start)
    .lte("transaction_date", end)
    .order("transaction_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not load transactions.", { cause: error });
  return normalize(data);
}

/** Version 1 keeps the full list client-side for instant search; cap keeps it bounded. */
export const ALL_TRANSACTIONS_LIMIT = 2000;

export async function getAllTransactions(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select(COLUMNS)
    .eq("user_id", userId)
    .order("transaction_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(ALL_TRANSACTIONS_LIMIT);

  if (error) throw new Error("Could not load transactions.", { cause: error });
  return normalize(data);
}

function normalize(rows: unknown[] | null): Transaction[] {
  return ((rows ?? []) as Transaction[]).map((row) => ({ ...row, amount: Number(row.amount) }));
}
