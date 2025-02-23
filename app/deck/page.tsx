import { Suspense } from 'react';
import { DeckHeader } from '@/components/deck/deck-header';
import { DeckGrid } from '@/components/deck/deck-grid';
import { DeckStats } from '@/components/deck/deck-stats';
import { LoadingCards } from '@/components/deck/loading-cards';

export const metadata = {
  title: 'Your Deck | PokéSort',
  description: 'Manage and view your Pokémon card collection',
};

export default async function DeckPage() {
  return (
    <main className="container-width min-h-screen py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <DeckHeader />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Suspense fallback={<LoadingCards />}>
            <DeckGrid />
          </Suspense>
        </div>

        <aside className="space-y-6">
          <Suspense>
            <DeckStats />
          </Suspense>
        </aside>
      </div>
    </main>
  );
}