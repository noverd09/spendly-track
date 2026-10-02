import { Skeleton } from "@/components/ui/states";

export default function TransactionsLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading transactions">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex flex-col gap-3 lg:flex-row">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-full rounded-full lg:w-[28rem]" />
      </div>
      <div className="overflow-hidden rounded-lg border border-rule bg-paper-raised">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex items-center gap-3 border-b border-rule px-5 py-3 last:border-0">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
