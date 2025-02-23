'use client';

import { motion } from "framer-motion";
import Link from 'next/link';
import { PokemonCardModal } from '@/components/pokemon/PokemonCardModal';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Background } from "@/components/ui/Background";


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Mock data moved outside component and made stable
const MOCK_POKEMON_DATA = [...Array(12)].map((_, i) => ({
  id: `pokedex-${i + 1}`,
  number: String(i + 1).padStart(3, '0'),
  name: `Pokémon #${i + 1}`,
  type: ['Fire', 'Water', 'Grass', 'Electric', 'Psychic'][i % 5],
  rarity: ['Common', 'Uncommon', 'Rare', 'Ultra Rare'][i % 4],
  variant: i % 3 === 0 ? 'Holofoil' : undefined,
  isCollected: i % 2 === 0
}));

const MOCK_EXPANSIONS = [...Array(3)].map((_, i) => ({
  id: i + 1,
  name: `Expansion Pack ${i + 1}`,
  collected: 0,
  total: 150,
}));

const MOCK_ACTIVITIES = [
  { text: "Added Charizard to collection", time: "2h ago", icon: "➕" },
  { text: "Completed Base Set", time: "1d ago", icon: "🏆" },
  { text: "Started new trade", time: "2d ago", icon: "🔄" }
];

export default function MobileDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<null | {
    id: string;
    number: string;
    name: string;
    type: string;
    rarity: string;
    variant?: string;
    isCollected: boolean;
    imageUrl?: string;
  }>(null);

  const [showGenerations, setShowGenerations] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  if (status === 'loading') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="fixed inset-0 bg-[var(--bg-primary)] overflow-y-auto mt-14">
      {/* Background Effects */}
      <Background />

      <div className="relative z-10 min-h-full pt-1">
        {/* User Profile Bar */}
        <section className="container-width py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center overflow-hidden">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.username || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">👤</span>
                )}
              </div>
              <div>
                <h3 className="font-medium text-[var(--text-primary)]">
                  {session?.user?.username || 'Loading...'}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">Collector Level 1</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
              <button className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Navigation Bar */}
        <section className="container-width py-2">
          <div className="grid grid-cols-5 gap-2">
            {[
              { label: "Collection", icon: "📚" },
              { label: "Expansions", icon: "🎴" },
              { label: "Pokédex", icon: "📱" },
              { label: "Scan", icon: "📷" },
              { label: "Add", icon: "➕" }
            ].map((tab) => (
              <button
                key={tab.label}
                className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors flex flex-col items-center gap-1"
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs truncate w-full text-center">{tab.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Stats Overview */}
        <section className="container-width py-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Pokémon", value: "0", color: "from-sky-400 to-blue-600" },
              { label: "Expansions", value: "0", color: "from-emerald-400 to-teal-600" },
              { label: "Completed Sets", value: "0", color: "from-purple-400 to-indigo-600" },
              { label: "Completion %", value: "0%", color: "from-amber-400 to-orange-600" }
            ].map((stat) => (
              <div
                key={stat.label}
                className="card gradient-border p-3"
              >
                <h3 className="text-sm text-[var(--text-secondary)]">{stat.label}</h3>
                <p className={`text-lg font-bold mt-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content Area */}
        <div className="container-width py-4">
          {/* Expansions Grid */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎴</span>
                <h2 className="text-xl font-bold gradient-text">Expansions</h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <Link href="/dashboard/expansions">
                  <button className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {MOCK_EXPANSIONS.map((expansion) => (
                <Link
                  key={expansion.id}
                  href={`/dashboard/expansions/${expansion.id}`}
                >
                  <motion.div
                    variants={fadeInUp}
                    className="card gradient-border p-3 relative group cursor-pointer h-full"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                        <span className="text-xl">📦</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-[var(--text-primary)] text-sm">{expansion.name}</h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">{expansion.collected}/{expansion.total}</p>
                        <div className="w-full h-1.5 rounded-full bg-[var(--bg-tertiary)] mt-2">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${(expansion.collected / expansion.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>

          {/* Pokédex View */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <h2 className="text-xl font-bold gradient-text">Pokédex</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => setShowGenerations(!showGenerations)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <button
                  className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Search Bar - Only shown when search is active */}
            {showSearch && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search Pokémon..."
                  className="w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg px-4 py-2.5 border border-[var(--surface-primary)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
            )}

            {/* Generations Filter - Only shown when filter is active */}
            {showGenerations && (
              <div className="mb-4">
                <select className="w-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg px-3 py-2.5 border border-[var(--surface-primary)] focus:outline-none focus:border-[var(--primary)]">
                  <option>All Generations</option>
                  <option>Gen I</option>
                  <option>Gen II</option>
                  <option>Gen III</option>
                  <option>Gen IV</option>
                  <option>Gen V+</option>
                </select>
              </div>
            )}

            {/* Pokémon Grid */}
            <div className="grid grid-cols-3 gap-3">
              {MOCK_POKEMON_DATA.map((pokemon) => (
                <motion.div
                  key={pokemon.id}
                  variants={fadeInUp}
                  className="card gradient-border aspect-square relative group cursor-pointer"
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedCard(pokemon)}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-secondary)]">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-1">
                      <span className="text-lg">❓</span>
                    </div>
                    <p className="text-xs">#{pokemon.number}</p>
                    <p className="text-[10px] mt-0.5 text-[var(--text-secondary)]">
                      {pokemon.isCollected ? 'Collected' : 'Not Found'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-6">
              <button className="px-6 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
                Load More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Modal */}
      <PokemonCardModal
        isOpen={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
        card={selectedCard ?? {
          id: '',
          number: '',
          name: '',
          type: '',
          rarity: '',
          isCollected: false
        }}
      />
    </main>
  );
}