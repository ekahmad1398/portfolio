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
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(ellipse_at_72%_8%,rgba(165,139,235,0.12),transparent_62%)]" />
      <div className="relative w-full max-w-lg">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Full stack / MERN</p>
        <p className="mt-4 font-heading text-2xl font-medium tracking-tight text-foreground">{label}</p>
        <p className="mt-2 text-sm text-muted-foreground">Preparing the portfolio.</p>
        <div className="mt-7 h-px w-full overflow-hidden bg-border">
          <div className="loader-progress-bar h-full" />
        </div>
      </div>
    </div>
  );
}
