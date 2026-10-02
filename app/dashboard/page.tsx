import { DashboardView } from "@/components/dashboard/dashboard-view";
import { currentMonthKey, monthRange, parseMonthKey } from "@/lib/dates";
import { requireUser } from "@/lib/supabase/server";
import { getTransactionsBetween } from "@/lib/transactions/queries";

export const metadata = { title: "Dashboard" };

function displayName(email: string) {
  const first = email.split("@")[0].split(/[._\-+0-9]/).find(Boolean) ?? "there";
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export default async function DashboardPage({ searchParams }: PageProps<"/dashboard">) {
  const params = await searchParams;
  const month = parseMonthKey(typeof params.month === "string" ? params.month : null) ?? currentMonthKey();
  const user = await requireUser();
  const { start, end } = monthRange(month);
  const transactions = await getTransactionsBetween(user.id, start, end);

  return <DashboardView transactions={transactions} month={month} name={displayName(user.email)} />;
}
