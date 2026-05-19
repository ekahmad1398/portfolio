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
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-950/90 px-6 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute left-[8%] top-[22%] h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl loader-float" />
      <div
        className="pointer-events-none absolute right-[12%] bottom-[18%] h-44 w-44 rounded-full bg-blue-500/12 blur-3xl loader-float"
        style={{ animationDelay: "-1.4s" }}
      />

      <div className="surface-card relative flex min-w-[18rem] max-w-md flex-col gap-5 overflow-hidden rounded-[1.85rem] border border-white/10 px-8 py-7 text-center shadow-[0_26px_72px_rgba(2,6,23,0.42)]">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/80">
          Loading Portfolio
        </span>
        <div>
          <p className="font-display text-2xl font-semibold text-[color:var(--text-main)]">
            {label}
          </p>
          <p className="mt-2 text-sm text-[color:var(--text-muted)]">
            Preparing a cleaner frontend showcase with the portfolio dark glass finish.
          </p>
        </div>
        <div className="loader-orb mx-auto">
          <span />
          <span />
          <span />
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
          <div className="loader-progress-bar h-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
