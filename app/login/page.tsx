import Link from "next/link";
import { AuthFrame } from "@/components/auth/auth-frame";
import { LoginForm } from "@/components/auth/auth-forms";

export const metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const next = typeof params.next === "string" && params.next.startsWith("/") && !params.next.startsWith("//") ? params.next : undefined;
  const notice = params.error === "confirm" ? "That confirmation link is invalid or has expired. Try signing in, or sign up again." : undefined;

  return (
    <AuthFrame
      title="Welcome back"
      subtitle="Sign in to see where your money went."
      footer={
        <>
          New to Spendly?{" "}
          <Link href="/signup" className="font-semibold text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-ink">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm next={next} notice={notice} />
    </AuthFrame>
  );
}
