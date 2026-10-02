"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { ErrorNote } from "@/components/ui/states";
import { signIn, signUp, type AuthState } from "@/lib/auth/actions";

function PasswordInput({ id, name, autoComplete, describedBy }: { id: string; name: string; autoComplete: string; describedBy?: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Input id={id} name={name} type={visible ? "text" : "password"} autoComplete={autoComplete} required className="pr-11" aria-describedby={describedBy} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-1 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-graphite hover:text-ink"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
      >
        {visible ? <EyeOff aria-hidden className="size-4" /> : <Eye aria-hidden className="size-4" />}
      </button>
    </div>
  );
}

export function LoginForm({ next, notice }: { next?: string; notice?: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(signIn, undefined);

  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      {next ? <input type="hidden" name="next" value={next} /> : null}
      {notice && !state?.error ? <ErrorNote>{notice}</ErrorNote> : null}
      <Field id="email" label="Email">
        <Input id="email" name="email" type="email" autoComplete="email" inputMode="email" required defaultValue={state?.fields?.email} />
      </Field>
      <Field id="password" label="Password">
        <PasswordInput id="password" name="password" autoComplete="current-password" />
      </Field>
      {state?.error ? <ErrorNote>{state.error}</ErrorNote> : null}
      <Button type="submit" size="lg" variant="ink" loading={pending} className="mt-2 w-full">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

export function SignupForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signUp, undefined);

  if (state?.message) {
    return (
      <div role="status" className="flex flex-col items-start gap-3 rounded-lg border border-rule bg-paper-raised p-5">
        <span className="grid size-10 place-items-center rounded-full bg-moss-tint text-moss">
          <MailCheck aria-hidden className="size-5" />
        </span>
        <p className="font-semibold">Check your inbox</p>
        <p className="text-sm text-graphite">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      <Field id="email" label="Email">
        <Input id="email" name="email" type="email" autoComplete="email" inputMode="email" required defaultValue={state?.fields?.email} />
      </Field>
      <Field id="password" label="Password" hint="At least 8 characters.">
        <PasswordInput id="password" name="password" autoComplete="new-password" describedBy="password-hint" />
      </Field>
      <Field id="confirm" label="Confirm password">
        <PasswordInput id="confirm" name="confirm" autoComplete="new-password" />
      </Field>
      {state?.error ? <ErrorNote>{state.error}</ErrorNote> : null}
      <Button type="submit" size="lg" loading={pending} className="mt-2 w-full">
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
