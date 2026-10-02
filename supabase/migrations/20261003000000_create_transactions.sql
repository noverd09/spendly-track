-- Spendly: transactions table, ownership enforced by Row Level Security.
-- Apply with `supabase db push` or paste into the Supabase SQL editor.

create table if not exists public.transactions (
  id               uuid primary key default gen_random_uuid(),
  -- Defaults to the caller, so clients never need to (or get to) send user_id.
  user_id          uuid not null default auth.uid() references auth.users (id) on delete cascade,
  type             text not null check (type in ('income', 'expense')),
  amount           numeric(14, 2) not null check (amount > 0),
  category         text not null check (char_length(category) between 1 and 40),
  description      text check (description is null or char_length(description) <= 140),
  transaction_date date not null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table public.transactions is 'Income and expense entries. One row per transaction, owned by user_id.';

-- Dashboard and list queries filter by owner and date range, newest first.
create index if not exists transactions_user_date_idx
  on public.transactions (user_id, transaction_date desc, created_at desc);

-- Keep updated_at honest regardless of what the client sends.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists transactions_set_updated_at on public.transactions;
create trigger transactions_set_updated_at
  before update on public.transactions
  for each row execute function public.set_updated_at();

-- Row Level Security: every policy ties the row to auth.uid().
alter table public.transactions enable row level security;

drop policy if exists "Users can read their own transactions" on public.transactions;
create policy "Users can read their own transactions"
  on public.transactions for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own transactions" on public.transactions;
create policy "Users can create their own transactions"
  on public.transactions for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own transactions" on public.transactions;
create policy "Users can update their own transactions"
  on public.transactions for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own transactions" on public.transactions;
create policy "Users can delete their own transactions"
  on public.transactions for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- Anonymous visitors get nothing; authenticated users get only what RLS allows.
revoke all on public.transactions from anon;
grant select, insert, update, delete on public.transactions to authenticated;
