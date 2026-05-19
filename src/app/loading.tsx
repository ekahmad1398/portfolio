export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-card flex w-full max-w-lg flex-col gap-6 px-8 py-8">
        <div className="h-3 w-28 rounded-full bg-white/10" />
        <div className="space-y-4">
          <div className="h-10 w-full rounded-2xl bg-white/10" />
          <div className="h-5 w-5/6 rounded-full bg-white/10" />
          <div className="h-5 w-4/6 rounded-full bg-white/10" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-40 rounded-[1.75rem] bg-white/10" />
          <div className="h-40 rounded-[1.75rem] bg-white/10" />
        </div>
      </div>
    </main>
  );
}
