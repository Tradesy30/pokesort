'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

export function DeckHeader() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text text-center">Your Deck</h1>
        <p className="text-[var(--text-secondary)] mt-2 text-center">
          Manage and organize your Pokémon card collection
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors">
            Add Cards
          </button>
        </div>
      </div>
    </div>
  );
}