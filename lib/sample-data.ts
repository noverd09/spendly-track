import type { Transaction } from "@/types/transaction";

// Illustrative entries for the marketing preview only. Clearly labelled as a
// sample on the page; never used inside the app.

const rows: [string, Transaction["type"], number, string, string | null][] = [
  ["2026-10-01", "income", 42000, "Salary", "October salary"],
  ["2026-10-01", "expense", 9500, "Bills", "Rent share"],
  ["2026-10-02", "expense", 350, "Food", "Lunch"],
  ["2026-10-03", "expense", 250, "Transportation", "Grab to work"],
  ["2026-10-04", "expense", 1890, "Shopping", "Running shoes"],
  ["2026-10-05", "income", 8500, "Freelance", "Website project"],
  ["2026-10-06", "expense", 850, "Food", "Groceries"],
  ["2026-10-08", "expense", 1499, "Bills", "Internet"],
  ["2026-10-09", "expense", 420, "Entertainment", "Movie night"],
  ["2026-10-11", "expense", 1200, "Health", "Dental check-up"],
  ["2026-10-12", "expense", 640, "Food", "Weekend market"],
  ["2026-10-14", "expense", 3200, "Travel", "Bus to Baguio"],
];

export const SAMPLE_TRANSACTIONS: Transaction[] = rows
  .map(([date, type, amount, category, description], i) => ({
    id: `sample-${i}`,
    user_id: "sample",
    type,
    amount,
    category,
    description,
    transaction_date: date,
    created_at: `${date}T09:00:00Z`,
    updated_at: `${date}T09:00:00Z`,
  }))
  .reverse();
