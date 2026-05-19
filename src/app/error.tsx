"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="section-shell flex min-h-screen items-center justify-center">
      <div className="glass-card max-w-xl p-8 text-center">
        <p className="section-eyebrow">Something went wrong</p>
        <h1 className="section-title">This page could not be loaded correctly.</h1>
        <p className="section-copy mt-4">
          {error.message || "An unexpected rendering error happened."}
        </p>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={reset}
            className="interactive-lift rounded-full border border-blue-300/40 bg-blue-500 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
