import Link from "next/link";
import { AuthFrame } from "@/components/auth/auth-frame";
import { SignupForm } from "@/components/auth/auth-forms";

export const metadata = { title: "Create your account" };

export default function SignupPage() {
  return (
    <AuthFrame
      title="Create your account"
      subtitle="Free, private, and ready in under a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-ink">
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthFrame>
  );
}
