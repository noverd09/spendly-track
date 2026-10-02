# Spendly

**Know where your money goes.** A simple personal finance tracker: create an account, record income and expenses, and see the month's balance and spending at a glance.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Auth + Postgres + Row Level Security) · Vercel.

## Features

- Email/password sign-up, sign-in and sign-out (Supabase Auth, cookie sessions via `@supabase/ssr`)
- Protected `/dashboard/*` routes (proxy redirect + server-side check in the layout)
- Transactions CRUD with validation on both client and server
- Dashboard per month: balance, income, expenses, running-spend curve, recent transactions, spending by category
- Transactions page: search, type and category filters, sorting, edit, delete with confirmation
- Settings: account email, currency (PHP ₱), log out
- Empty, loading and error states; keyboard-accessible dialogs; responsive from 320px up

## Getting started

1. **Install:** `npm install`
2. **Create a Supabase project** (or provision one through the Vercel Marketplace), then copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (the anon/publishable key — never the secret key)
3. **Apply the schema:** run `supabase/migrations/20261003000000_create_transactions.sql` with `supabase db push`, or paste it into the Supabase SQL editor.
4. **Auth redirect:** in Supabase → Authentication → URL Configuration, set the Site URL to your deployed URL and add `<your-url>/auth/confirm` as a redirect URL.
5. **Run:** `npm run dev` → http://localhost:3000

## Security model

- RLS is enabled on `public.transactions`, with SELECT/INSERT/UPDATE/DELETE policies all scoped to `auth.uid() = user_id`.
- `user_id` defaults to `auth.uid()` in the database; the app never sends it, and the client can't choose it.
- All mutations run as Server Actions that verify the session with `getClaims()` and re-validate input.
- Only the publishable key is used in the app. No service-role key exists anywhere in the code.

## Project structure

```
app/                 routes (landing, auth, dashboard, legal)
components/          ui · layout · dashboard · transactions · marketing · auth
lib/supabase/        server client, proxy session refresh, env
lib/transactions/    queries, server actions, validation, summaries
lib/                 currency, dates, categories
supabase/migrations/ schema + RLS
DESIGN.md            design system (Google DESIGN.md format)
```
