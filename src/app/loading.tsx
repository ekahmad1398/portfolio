export default function Loading() {
  return (
    <main className="section-shell flex min-h-[70vh] items-center">
      <div className="w-full max-w-2xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Full stack / MERN</p>
        <h1 className="mt-5 font-heading text-4xl font-medium tracking-tight text-foreground">Building the page...</h1>
        <div className="mt-8 h-px w-full overflow-hidden bg-border">
          <div className="loader-progress-bar h-full" />
        </div>
      </div>
    </main>
  );
}
