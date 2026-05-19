export default function Loading() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#08111f] px-6 py-10 text-slate-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.22),transparent_58%)]" />
      <div className="pointer-events-none absolute -left-16 top-[18%] h-56 w-56 rounded-full bg-cyan-400/12 blur-3xl loader-float" />
      <div
        className="pointer-events-none absolute -right-10 bottom-[18%] h-64 w-64 rounded-full bg-blue-500/12 blur-3xl loader-float"
        style={{ animationDelay: "-1.8s" }}
      />

      <div className="glass-card relative z-10 flex w-full max-w-3xl flex-col gap-8 overflow-hidden rounded-[2rem] border border-white/10 px-6 py-7 shadow-[0_32px_90px_rgba(2,6,23,0.46)] sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="section-eyebrow text-sky-200/80">Loading Portfolio</p>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-slate-50 sm:text-4xl">
              Preparing the polished dark experience.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
              Bringing in featured work, refined surfaces, and the same calm frontend feel you see across the portfolio.
            </p>
          </div>

          <div className="panel-accent relative min-w-[15rem] rounded-[1.6rem] border border-white/10 px-5 py-5">
            <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />
            <div className="flex items-center gap-3">
              <span className="loader-dot" />
              <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-sky-100/80">
                System Ready
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
              <div className="loader-progress-bar h-full rounded-full" />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Fetching content</span>
              <span>UI pass</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="surface-card loader-panel flex min-h-[15rem] flex-col gap-4 rounded-[1.75rem] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-3">
                <div className="loader-line h-3 w-28 rounded-full" />
                <div className="loader-line h-9 w-[min(24rem,70vw)] rounded-[1rem]" />
              </div>
              <div className="loader-orb hidden sm:flex">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="space-y-3">
              <div className="loader-line h-4 w-full rounded-full" />
              <div className="loader-line h-4 w-5/6 rounded-full" />
              <div className="loader-line h-4 w-3/5 rounded-full" />
            </div>
            <div className="mt-auto grid gap-3 sm:grid-cols-3">
              <div className="loader-chip h-10 rounded-full" />
              <div className="loader-chip h-10 rounded-full" />
              <div className="loader-chip h-10 rounded-full" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="glass-card loader-panel min-h-[10.75rem] rounded-[1.6rem] p-5">
              <div className="loader-line h-3 w-24 rounded-full" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="loader-tile h-24 rounded-[1.25rem]" />
                <div className="loader-tile h-24 rounded-[1.25rem]" />
              </div>
            </div>
            <div className="glass-card loader-panel min-h-[10.75rem] rounded-[1.6rem] p-5">
              <div className="loader-line h-3 w-20 rounded-full" />
              <div className="mt-4 space-y-3">
                <div className="loader-line h-4 w-full rounded-full" />
                <div className="loader-line h-4 w-4/5 rounded-full" />
                <div className="loader-line h-4 w-2/3 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
