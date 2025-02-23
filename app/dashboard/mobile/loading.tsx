export default function DashboardLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="space-y-8 w-full max-w-md px-4">
        {/* Profile Skeleton */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-[var(--bg-tertiary)] rounded animate-pulse" />
            <div className="h-3 w-24 bg-[var(--bg-tertiary)] rounded animate-pulse" />
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-[var(--bg-tertiary)] animate-pulse">
              <div className="h-3 w-20 bg-[var(--surface-primary)] rounded mb-2" />
              <div className="h-5 w-12 bg-[var(--surface-primary)] rounded" />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-48 bg-[var(--bg-tertiary)] rounded animate-pulse" />
          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-[var(--bg-tertiary)] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}