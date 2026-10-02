import { LegalPage } from "@/components/marketing/legal-page";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="Oct 3, 2026">
      <p>This is a placeholder policy for Spendly version 1. It describes how the product works today in plain language.</p>
      <h2>What we store</h2>
      <p>Your email address and password (handled by our authentication provider — Spendly never sees your password), and the transactions you enter: type, amount, category, description and date.</p>
      <h2>Who can see it</h2>
      <p>Only you. Every transaction is tied to your account and protected by database-level access rules, so other users cannot read, change or delete it.</p>
      <h2>What we don&rsquo;t do</h2>
      <p>We don&rsquo;t connect to your bank, sell your data, or show ads.</p>
      <h2>Deleting your data</h2>
      <p>You can delete any transaction at any time from the Transactions page.</p>
    </LegalPage>
  );
}
