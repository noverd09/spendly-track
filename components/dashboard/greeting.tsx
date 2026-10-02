"use client";

import { useSyncExternalStore } from "react";

function partOfDay() {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
}

/** Uses the visitor's clock, not the server's (Vercel runs in UTC). */
export function Greeting({ name }: { name: string }) {
  const greeting = useSyncExternalStore(
    () => () => {},
    partOfDay,
    () => "Hello",
  );
  return (
    <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.025em] sm:text-[30px]">
      {greeting}, {name}
    </h1>
  );
}
