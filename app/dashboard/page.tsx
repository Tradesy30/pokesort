'use client';

import { motion } from "framer-motion";
import { Sparkles } from '@/app/components/ui/sparkles';
import Link from 'next/link';
import { PokemonCardModal } from '@/app/components/pokemon/PokemonCardModal';
import { useState } from 'react';
import { AchievementsPanel } from '@/app/components/achievements/AchievementsPanel';

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

export default function Dashboard() {
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

  // Mock Pokédex data
  const pokemonData = [...Array(12)].map((_, i) => ({
    id: `pokedex-${i + 1}`,
    number: String(i + 1).padStart(3, '0'),
    name: `Pokémon #${i + 1}`,
    type: ['Fire', 'Water', 'Grass', 'Electric', 'Psychic'][Math.floor(Math.random() * 5)],
    rarity: ['Common', 'Uncommon', 'Rare', 'Ultra Rare'][Math.floor(Math.random() * 4)],
    variant: Math.random() > 0.7 ? 'Holofoil' : undefined,
    isCollected: Math.random() > 0.7
  }));

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <Sparkles
          id="sparkles"
          particleColor="#60A5FA"
          particleDensity={50}
          speed={0.3}
          minSize={0.8}
          maxSize={1.5}
          particleGlow={true}
        />
      </div>

      <div className="relative z-10">
        {/* User Profile Bar */}
        <section className="container-width py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h3 className="font-medium text-[var(--text-primary)]">Trainer Name</h3>
                <p className="text-sm text-[var(--text-secondary)]">Collector Level 1</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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

        {/* Main Content Grid */}
        <div className="container-width py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar - Now on the left */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <section className="card gradient-border p-4">
                <h2 className="text-lg font-bold gradient-text mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Scan Card", icon: "📷" },
                    { label: "Add Card", icon: "➕" },
                    { label: "Trade", icon: "🔄" },
                    { label: "Share", icon: "📤" }
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="p-3 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--surface-secondary)] transition-colors flex flex-col items-center gap-2"
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <span className="text-sm text-[var(--text-secondary)]">{action.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Achievements Panel */}
              <section className="card gradient-border p-4">
                <AchievementsPanel />
              </section>

              {/* Recent Activity */}
              <section className="card gradient-border p-4">
                <h2 className="text-lg font-bold gradient-text mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {[
                    { text: "Added Charizard to collection", time: "2h ago", icon: "➕" },
                    { text: "Completed Base Set", time: "1d ago", icon: "🏆" },
                    { text: "Started new trade", time: "2d ago", icon: "🔄" }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors">
                      <span className="text-xl">{activity.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm text-[var(--text-primary)]">{activity.text}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Main Content Area - Now on the right */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Overview */}
              <section>
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={staggerContainer}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {[
                    { label: "Total Pokémon", value: "0", color: "from-sky-400 to-blue-600" },
                    { label: "Expansions", value: "0", color: "from-emerald-400 to-teal-600" },
                    { label: "Completed Sets", value: "0", color: "from-purple-400 to-indigo-600" },
                    { label: "Completion %", value: "0%", color: "from-amber-400 to-orange-600" }
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={fadeInUp}
                      className="card gradient-border p-4 lg:p-6"
                    >
                      <h3 className="text-sm lg:text-base text-[var(--text-secondary)]">{stat.label}</h3>
                      <p className={`text-2xl lg:text-3xl font-bold mt-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </section>

              {/* Navigation Tabs */}
              <section>
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {[
                    { label: "Collection", icon: "📚" },
                    { label: "Expansions", icon: "🎴" },
                    { label: "Pokédex", icon: "📱" },
                    { label: "Trading", icon: "🔄" },
                    { label: "Wishlist", icon: "⭐" }
                  ].map((tab) => (
                    <button
                      key={tab.label}
                      className="px-6 py-3 text-base rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors flex items-center gap-2 font-medium"
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </motion.div>
              </section>

              {/* Expansions Grid */}
              <section>
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl lg:text-2xl font-bold gradient-text">Expansions</h2>
                    <select className="bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg px-3 py-1 border border-[var(--surface-primary)] focus:outline-none focus:border-[var(--primary)]">
                      <option>Latest First</option>
                      <option>Oldest First</option>
                      <option>Completion %</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <Link
                        key={i}
                        href={`/dashboard/expansions/${i + 1}`}
                      >
                        <motion.div
                          variants={fadeInUp}
                          className="card gradient-border p-4 relative group cursor-pointer"
                          whileHover={{ y: -5 }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                              <span className="text-2xl">📦</span>
                            </div>
                            <div>
                              <h3 className="font-medium text-[var(--text-primary)]">Expansion Pack {i + 1}</h3>
                              <p className="text-sm text-[var(--text-secondary)] mt-1">0/0 cards collected</p>
                              <div className="w-full h-2 rounded-full bg-[var(--bg-tertiary)] mt-2">
                                <div className="w-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </section>

              {/* Pokédex View */}
              <section>
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl lg:text-2xl font-bold gradient-text">Pokédex</h2>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Search Pokémon..."
                        className="bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg px-4 py-2 border border-[var(--surface-primary)] focus:outline-none focus:border-[var(--primary)]"
                      />
                      <select className="bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg px-3 py-1 border border-[var(--surface-primary)] focus:outline-none focus:border-[var(--primary)]">
                        <option>All Generations</option>
                        <option>Gen I</option>
                        <option>Gen II</option>
                        <option>Gen III</option>
                        <option>Gen IV</option>
                        <option>Gen V+</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {pokemonData.map((pokemon) => (
                      <motion.div
                        key={pokemon.id}
                        variants={fadeInUp}
                        className="card gradient-border aspect-square relative group cursor-pointer"
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedCard(pokemon)}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-secondary)]">
                          <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-2">
                            <span className="text-xl">❓</span>
                          </div>
                          <p className="text-sm">#{pokemon.number}</p>
                          <p className="text-xs mt-1 text-[var(--text-secondary)]">
                            {pokemon.isCollected ? 'Collected' : 'Not Collected'}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-8">
                    <button className="button-secondary">
                      Load More
                    </button>
                  </div>
                </motion.div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Pokemon Card Modal */}
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