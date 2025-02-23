export function LoadingProfile() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Collection Highlights Skeleton */}
      <section>
        <div className="h-7 w-48 bg-[var(--surface-primary)] rounded-lg mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="card gradient-border p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--surface-primary)]" />
              <div className="flex-1">
                <div className="h-5 w-32 bg-[var(--surface-primary)] rounded-lg mb-2" />
                <div className="h-4 w-24 bg-[var(--surface-primary)] rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity Skeleton */}
      <section>
        <div className="h-7 w-48 bg-[var(--surface-primary)] rounded-lg mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card gradient-border p-4">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-[var(--surface-primary)]" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-5 w-32 bg-[var(--surface-primary)] rounded-lg" />
                    <div className="h-4 w-20 bg-[var(--surface-primary)] rounded-lg" />
                  </div>
                  <div className="h-4 w-48 bg-[var(--surface-primary)] rounded-lg mt-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Overview Skeleton */}
      <section>
        <div className="h-7 w-48 bg-[var(--surface-primary)] rounded-lg mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card gradient-border p-4">
              <div className="h-4 w-24 bg-[var(--surface-primary)] rounded-lg mb-2" />
              <div className="h-8 w-16 bg-[var(--surface-primary)] rounded-lg" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}