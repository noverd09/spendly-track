import { AddTransactionButton } from "@/components/transactions/transaction-dialogs";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { getCurrentUser } from "@/lib/supabase/server";
import { ALL_TRANSACTIONS_LIMIT, getAllTransactions } from "@/lib/transactions/queries";

export const metadata = { title: "Transactions" };

export default async function TransactionsPage() {
  const user = (await getCurrentUser())!;
  const transactions = await getAllTransactions(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex animate-rise flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.025em] sm:text-[30px]">Transactions</h1>
          <p className="mt-1 text-[15px] text-graphite">Every peso in and out, in one place.</p>
        </div>
        <AddTransactionButton className="hidden md:inline-flex" />
      </header>
      <div className="animate-rise [animation-delay:60ms]">
        <TransactionTable transactions={transactions} />
      </div>
      {transactions.length >= ALL_TRANSACTIONS_LIMIT ? (
        <p className="text-[13px] text-graphite">Showing your {ALL_TRANSACTIONS_LIMIT.toLocaleString()} most recent transactions.</p>
      ) : null}
    </div>
  );
}
