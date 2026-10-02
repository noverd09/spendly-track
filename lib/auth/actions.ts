"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string; fields?: { email?: string } } | undefined;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOT_CONFIGURED = "Spendly isn't connected to its database yet. Please try again later.";

/** Only allow same-site relative paths, so ?next= can't redirect off-site. */
function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : "/dashboard";
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!EMAIL.test(email)) return { error: "Enter a valid email address.", fields: { email } };
  if (!password) return { error: "Enter your password.", fields: { email } };
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED, fields: { email } };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const message =
      error.code === "email_not_confirmed"
        ? "Confirm your email first — check your inbox for the link."
        : error.code === "invalid_credentials"
          ? "That email and password don't match."
          : "We couldn't sign you in. Please try again.";
    return { error: message, fields: { email } };
  }

  redirect(safeNext(formData.get("next")));
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!EMAIL.test(email)) return { error: "Enter a valid email address.", fields: { email } };
  if (password.length < 8) return { error: "Use at least 8 characters for your password.", fields: { email } };
  if (password !== confirm) return { error: "The passwords don't match.", fields: { email } };
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED, fields: { email } };

  const origin = (await headers()).get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/confirm` },
  });

  if (error) {
    const message =
      error.code === "weak_password"
        ? "Choose a stronger password — mix letters, numbers and symbols."
        : error.code === "user_already_exists"
          ? "An account with this email already exists. Sign in instead."
          : error.code === "over_email_send_rate_limit"
            ? "Too many sign-up emails were sent. Wait a minute and try again."
            : "We couldn't create your account. Please try again.";
    return { error: message, fields: { email } };
  }

  // With email confirmation on, there is no session yet.
  if (!data.session) {
    return { message: `We sent a confirmation link to ${email}. Open it to finish creating your account.` };
  }

  redirect("/dashboard");
}

export async function signOut() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/login");
}
