"use client";

import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div role="alert" className="mx-auto mt-10 max-w-md rounded-lg border border-rule bg-paper-raised p-8 text-center">
      <h1 className="text-lg font-semibold">We couldn&rsquo;t load your data.</h1>
      <p className="mt-2 text-sm text-graphite">This is usually a brief connection problem. Your transactions are safe.</p>
      <Button variant="ink" className="mt-6" onClick={() => retry()} icon={<RotateCw aria-hidden className="size-4" />}>
        Try again
      </Button>
    </div>
  );
}
