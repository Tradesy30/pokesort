import { PieChart, BarChart } from 'lucide-react';

export function DeckStats() {
  return (
    <div className="space-y-6">
      {/* Card Count */}
      <div className="card gradient-border p-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Deck Stats</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Total Cards</span>
            <span className="text-[var(--text-primary)] font-medium">60</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Unique Cards</span>
            <span className="text-[var(--text-primary)] font-medium">35</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Completion</span>
            <span className="text-[var(--text-primary)] font-medium">85%</span>
          </div>
        </div>
      </div>

      {/* Type Distribution */}
      <div className="card gradient-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="h-5 w-5 text-[var(--text-secondary)]" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Type Distribution</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="text-[var(--text-secondary)]">Fire</span>
            </div>
            <span className="text-[var(--text-primary)] font-medium">15</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💧</span>
              <span className="text-[var(--text-secondary)]">Water</span>
            </div>
            <span className="text-[var(--text-primary)] font-medium">12</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="text-[var(--text-secondary)]">Grass</span>
            </div>
            <span className="text-[var(--text-primary)] font-medium">18</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-[var(--text-secondary)]">Electric</span>
            </div>
            <span className="text-[var(--text-primary)] font-medium">15</span>
          </div>
        </div>
      </div>

      {/* Rarity Distribution */}
      <div className="card gradient-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart className="h-5 w-5 text-[var(--text-secondary)]" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Rarity Distribution</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Common</span>
            <span className="text-[var(--text-primary)] font-medium">25</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Uncommon</span>
            <span className="text-[var(--text-primary)] font-medium">20</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Rare</span>
            <span className="text-[var(--text-primary)] font-medium">10</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Ultra Rare</span>
            <span className="text-[var(--text-primary)] font-medium">5</span>
          </div>
        </div>
      </div>
    </div>
  );
}