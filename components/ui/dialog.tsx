"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

/**
 * Native <dialog> with showModal(): the browser provides the focus trap,
 * inert background, Esc to close and focus return. On phones it docks as a
 * bottom sheet.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  role,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  size?: "md" | "sm";
  role?: "alertdialog";
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      role={role}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Click on the scrim (the dialog box itself, outside the panel) closes.
        if (e.target === e.currentTarget) onClose();
      }}
      className={`m-0 mt-auto w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-transparent open:animate-sheet sm:m-auto ${
        size === "sm" ? "sm:max-w-[400px]" : "sm:max-w-[480px]"
      }`}
    >
      <div className="max-h-[92dvh] overflow-y-auto rounded-t-xl border border-rule bg-paper-raised p-5 shadow-float sm:rounded-xl sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 id={titleId} className="text-lg font-semibold tracking-[-0.01em]">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="mt-1 text-sm text-graphite">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 -mt-1 grid size-9 shrink-0 place-items-center rounded-md text-graphite transition-colors hover:bg-paper-sunken hover:text-ink"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
