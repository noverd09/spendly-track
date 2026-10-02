"use server";

import { revalidatePath } from "next/cache";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { validateTransaction } from "@/lib/transactions/validate";
import type { ActionResult } from "@/types/transaction";

const NOT_SIGNED_IN: ActionResult = { ok: false, error: "Your session has expired. Sign in again to continue." };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Ownership is never taken from the client. Inserts rely on the column default
// (auth.uid()) plus the RLS check; updates and deletes are scoped by RLS.

export async function createTransaction(input: unknown): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return NOT_SIGNED_IN;

  const parsed = validateTransaction(input);
  if (!parsed.data) return { ok: false, error: "Check the highlighted fields.", fieldErrors: parsed.errors };

  const supabase = await createClient();
  const { error } = await supabase.from("transactions").insert({ ...parsed.data, description: parsed.data.description || null });

  if (error) {
    console.error("createTransaction failed", error.code);
    return { ok: false, error: "We couldn't save that transaction. Please try again." };
  }

  revalidatePath("/dashboard", "layout");
  return { ok: true };
}

export async function updateTransaction(id: string, input: unknown): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return NOT_SIGNED_IN;
  if (typeof id !== "string" || !UUID.test(id)) return { ok: false, error: "That transaction doesn't exist." };

  const parsed = validateTransaction(input);
  if (!parsed.data) return { ok: false, error: "Check the highlighted fields.", fieldErrors: parsed.errors };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .update({ ...parsed.data, description: parsed.data.description || null })
    .eq("id", id)
    .select("id");

  if (error) {
    console.error("updateTransaction failed", error.code);
    return { ok: false, error: "We couldn't update that transaction. Please try again." };
  }
  if (!data?.length) return { ok: false, error: "That transaction no longer exists." };

  revalidatePath("/dashboard", "layout");
  return { ok: true };
}

export async function deleteTransaction(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return NOT_SIGNED_IN;
  if (typeof id !== "string" || !UUID.test(id)) return { ok: false, error: "That transaction doesn't exist." };

  const supabase = await createClient();
  const { data, error } = await supabase.from("transactions").delete().eq("id", id).select("id");

  if (error) {
    console.error("deleteTransaction failed", error.code);
    return { ok: false, error: "We couldn't delete that transaction. Please try again." };
  }
  if (!data?.length) return { ok: false, error: "That transaction no longer exists." };

  revalidatePath("/dashboard", "layout");
  return { ok: true };
}
