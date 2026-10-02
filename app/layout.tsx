import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: {
    default: "Spendly — Simple Personal Finance Tracker",
    template: "%s · Spendly",
  },
  description:
    "Track your income and expenses, understand your spending, and stay in control of your money with Spendly.",
  openGraph: {
    title: "Spendly — Simple Personal Finance Tracker",
    description: "Know where your money goes.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#141311",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
