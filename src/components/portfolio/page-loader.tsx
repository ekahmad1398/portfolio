"use client";

import { useEffect, useState } from "react";

type PageLoaderProps = {
  label: string;
};

export function PageLoader({ label }: PageLoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 850);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/72 px-6 backdrop-blur-xl dark:bg-slate-950/88">
      <div className="surface-card flex min-w-[18rem] max-w-md flex-col gap-4 px-8 py-7 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">
          Loading Portfolio
        </span>
        <div>
          <p className="font-display text-2xl font-semibold text-[color:var(--text-main)]">{label}</p>
          <p className="mt-2 text-sm text-[color:var(--text-muted)]">
            Preparing a cleaner frontend showcase.
          </p>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[color:var(--surface-muted)]">
          <div className="h-full w-full origin-left rounded-full bg-gradient-to-r from-sky-300 to-blue-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
