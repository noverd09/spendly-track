import { AppShell } from "@/components/layout/app-shell";
import { TransactionDialogs } from "@/components/transactions/transaction-dialogs";
import { ToastProvider } from "@/components/ui/toast";
import { requireUser } from "@/lib/supabase/server";

export const metadata = { robots: { index: false } };

// The proxy already redirects signed-out visitors; this is the authoritative check.
export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const user = await requireUser();

  return (
    <ToastProvider>
      <TransactionDialogs>
        <AppShell email={user.email}>{children}</AppShell>
      </TransactionDialogs>
    </ToastProvider>
  );
}
