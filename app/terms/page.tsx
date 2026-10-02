import { LegalPage } from "@/components/marketing/legal-page";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="Oct 3, 2026">
      <p>These are placeholder terms for Spendly version 1.</p>
      <h2>Using Spendly</h2>
      <p>Spendly is a personal record-keeping tool. The totals and charts it shows are calculated from what you enter and are not financial advice.</p>
      <h2>Your account</h2>
      <p>Keep your password private. You are responsible for activity under your account.</p>
      <h2>Availability</h2>
      <p>We work to keep Spendly running, but it is provided as-is and may change as it improves.</p>
    </LegalPage>
  );
}
