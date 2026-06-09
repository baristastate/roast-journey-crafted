import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground ${className}`}
    >
      <span className="h-px w-6 bg-current opacity-50" aria-hidden />
      {children}
    </span>
  );
}
