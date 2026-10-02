import { Skeleton } from "@/components/ui/states";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 md:gap-8" aria-busy="true" aria-label="Loading your dashboard">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-56 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-[1.6fr_1fr_1fr]">
        <Skeleton className="col-span-2 h-[164px] rounded-xl lg:col-span-1" />
        <Skeleton className="h-[120px] rounded-lg lg:h-auto" />
        <Skeleton className="h-[120px] rounded-lg lg:h-auto" />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <Skeleton className="h-[300px] rounded-lg" />
        <Skeleton className="h-[300px] rounded-lg" />
      </div>
    </div>
  );
}
