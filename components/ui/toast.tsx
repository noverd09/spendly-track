"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { CircleAlert, Check } from "lucide-react";

type Toast = { id: number; message: string; tone: "success" | "error" };
const ToastContext = createContext<(message: string, tone?: Toast["tone"]) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

/** One toast at a time, bottom-centre, overlaid (never shifts layout), 4s. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = useCallback((message: string, tone: Toast["tone"] = "success") => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), message, tone });
    timer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(88px+env(safe-area-inset-bottom))] z-50 flex justify-center px-4 md:bottom-8"
      >
        {toast ? (
          <div
            key={toast.id}
            className="pointer-events-auto flex animate-sheet items-center gap-2.5 rounded-full bg-ink py-2.5 pl-3 pr-4 text-sm font-medium text-on-ink shadow-float"
          >
            <span className={`grid size-5 place-items-center rounded-full ${toast.tone === "error" ? "bg-brick" : "bg-on-ink/15"}`}>
              {toast.tone === "error" ? <CircleAlert aria-hidden className="size-3.5" /> : <Check aria-hidden className="size-3.5" />}
            </span>
            {toast.message}
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}
