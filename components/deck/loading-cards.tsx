export function LoadingCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4] rounded-lg overflow-hidden relative animate-pulse"
        >
          <div className="absolute inset-0 bg-[var(--surface-primary)]" />

          <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
            {/* Avatar Circle */}
            <div className="w-16 h-16 rounded-full bg-[var(--surface-secondary)] mb-3" />

            {/* Title */}
            <div className="h-4 w-24 bg-[var(--surface-secondary)] rounded-full mb-2" />

            {/* Subtitle */}
            <div className="h-3 w-16 bg-[var(--surface-secondary)] rounded-full mb-2" />

            {/* Type Badge */}
            <div className="h-5 w-20 bg-[var(--surface-secondary)] rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}