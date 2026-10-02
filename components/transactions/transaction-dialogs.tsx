"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState, useTransition, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ErrorNote } from "@/components/ui/states";
import { useToast } from "@/components/ui/toast";
import { formatSigned } from "@/lib/currency";
import { formatDate } from "@/lib/dates";
import { deleteTransaction } from "@/lib/transactions/actions";
import type { Transaction } from "@/types/transaction";
import { TransactionForm } from "./transaction-form";

type Api = {
  openCreate: () => void;
  openEdit: (t: Transaction) => void;
  openDelete: (t: Transaction) => void;
};

const DialogsContext = createContext<Api>({ openCreate() {}, openEdit() {}, openDelete() {} });

export function useTransactionDialogs() {
  return useContext(DialogsContext);
}

type State = { mode: "closed" } | { mode: "create" } | { mode: "edit"; transaction: Transaction } | { mode: "delete"; transaction: Transaction };

/** Owns the add / edit / delete dialogs so any screen can open them. */
export function TransactionDialogs({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ mode: "closed" });
  // Bumped on every open so the form remounts with fresh values.
  const [formKey, setFormKey] = useState(0);
  const router = useRouter();
  const toast = useToast();

  const close = useCallback(() => setState({ mode: "closed" }), []);
  const api = useMemo<Api>(
    () => ({
      openCreate: () => {
        setFormKey((k) => k + 1);
        setState({ mode: "create" });
      },
      openEdit: (transaction) => {
        setFormKey((k) => k + 1);
        setState({ mode: "edit", transaction });
      },
      openDelete: (transaction) => setState({ mode: "delete", transaction }),
    }),
    [],
  );

  function done(message: string) {
    close();
    toast(message);
    router.refresh();
  }

  const isForm = state.mode === "create" || state.mode === "edit";

  return (
    <DialogsContext.Provider value={api}>
      {children}
      <Dialog
        open={isForm}
        onClose={close}
        title={state.mode === "edit" ? "Edit transaction" : "Add transaction"}
        description={state.mode === "edit" ? "Changes update your totals right away." : "Record money coming in or going out."}
      >
        {isForm ? (
          <TransactionForm
            key={formKey}
            transaction={state.mode === "edit" ? state.transaction : undefined}
            onDone={done}
            onCancel={close}
            onDelete={state.mode === "edit" ? () => api.openDelete(state.transaction) : undefined}
          />
        ) : null}
      </Dialog>
      <DeleteDialog transaction={state.mode === "delete" ? state.transaction : null} onClose={close} onDeleted={() => done("Transaction deleted")} />
    </DialogsContext.Provider>
  );
}

function DeleteDialog({ transaction, onClose, onDeleted }: { transaction: Transaction | null; onClose: () => void; onDeleted: () => void }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function confirm() {
    if (!transaction) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteTransaction(transaction.id);
      if (result.ok) onDeleted();
      else setError(result.error);
    });
  }

  function close() {
    if (pending) return;
    setError(null);
    onClose();
  }

  return (
    <Dialog open={Boolean(transaction)} onClose={close} size="sm" role="alertdialog" title="Delete this transaction?" description="This can't be undone.">
      {transaction ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-rule bg-paper px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{transaction.description || transaction.category}</p>
              <p className="text-[13px] text-graphite">{formatDate(transaction.transaction_date)}</p>
            </div>
            <span className={`tabular text-sm ${transaction.type === "income" ? "text-moss" : ""}`}>{formatSigned(transaction.amount, transaction.type)}</span>
          </div>
          {error ? <ErrorNote>{error}</ErrorNote> : null}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" onClick={close} disabled={pending} data-autofocus>
              Cancel
            </Button>
            <Button type="button" variant="danger" onClick={confirm} loading={pending}>
              {pending ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </div>
      ) : null}
    </Dialog>
  );
}

export function AddTransactionButton({ className = "", label = "Add transaction" }: { className?: string; label?: string }) {
  const { openCreate } = useTransactionDialogs();
  return (
    <Button onClick={openCreate} className={className} icon={<Plus aria-hidden className="size-4" strokeWidth={2} />}>
      {label}
    </Button>
  );
}
