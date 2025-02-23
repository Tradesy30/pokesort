'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from '@/components/ui/sparkles';
import { PokemonCardModal } from '@/components/pokemon/PokemonCardModal';
import { use, useState } from 'react';

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

export default function ExpansionDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
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

  // Mock data - In a real app, this would come from an API or database
  const expansionData = {
    id: resolvedParams.id,
    name: `Expansion Pack ${resolvedParams.id}`,
    totalCards: 150,
    collectedCards: 45,
    masterSetTotal: 300, // Including reverse holos, variants, etc.
    masterSetCollected: 75,
    releaseDate: "2024",
    description: "This expansion includes rare and powerful Pokémon cards from various regions.",
    cards: [...Array(18)].map((_, i) => ({
      id: `${resolvedParams.id}-${i + 1}`,
      number: String(i + 1).padStart(3, '0'),
      name: `Pokémon #${i + 1}`,
      type: ['Fire', 'Water', 'Grass', 'Electric', 'Psychic'][Math.floor(Math.random() * 5)],
      rarity: ['Common', 'Uncommon', 'Rare', 'Ultra Rare'][Math.floor(Math.random() * 4)],
      variant: Math.random() > 0.7 ? 'Holofoil' : undefined,
      isCollected: Math.random() > 0.7
    }))
  };

  const completionPercentage = (expansionData.collectedCards / expansionData.totalCards) * 100;
  const masterSetPercentage = (expansionData.masterSetCollected / expansionData.masterSetTotal) * 100;

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
        {/* Navigation */}
        <section className="container-width py-4">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Link
              href="/dashboard"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-2"
            >
              ← Back to Dashboard
            </Link>
          </motion.div>
        </section>

        {/* Expansion Header */}
        <section className="container-width py-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="card gradient-border p-6"
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center">
                <span className="text-4xl lg:text-5xl">📦</span>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold gradient-text">{expansionData.name}</h1>
                <p className="text-[var(--text-secondary)] mt-2">{expansionData.description}</p>
                <p className="text-[var(--text-secondary)] mt-1">Release Date: {expansionData.releaseDate}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Collection Progress */}
        <section className="container-width py-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
          >
            {/* Base Set Progress */}
            <motion.div
              variants={fadeInUp}
              className="card gradient-border p-6"
            >
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Base Set Progress</h2>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--text-secondary)]">Collected</span>
                  <span className="text-[var(--text-primary)]">{expansionData.collectedCards}/{expansionData.totalCards}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[var(--bg-tertiary)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-[var(--text-secondary)] text-sm mt-2">{completionPercentage.toFixed(1)}% Complete</p>
              </div>
            </motion.div>

            {/* Master Set Progress */}
            <motion.div
              variants={fadeInUp}
              className="card gradient-border p-6"
            >
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Master Set Progress</h2>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--text-secondary)]">Collected</span>
                  <span className="text-[var(--text-primary)]">{expansionData.masterSetCollected}/{expansionData.masterSetTotal}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[var(--bg-tertiary)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    style={{ width: `${masterSetPercentage}%` }}
                  />
                </div>
                <p className="text-[var(--text-secondary)] text-sm mt-2">{masterSetPercentage.toFixed(1)}% Complete</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Pokémon List */}
        <section className="container-width py-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl lg:text-2xl font-bold gradient-text">Pokémon in this Set</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search cards..."
                  className="bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg px-4 py-2 border border-[var(--surface-primary)] focus:outline-none focus:border-[var(--primary)]"
                />
                <select className="bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg px-3 py-1 border border-[var(--surface-primary)] focus:outline-none focus:border-[var(--primary)]">
                  <option>All Cards</option>
                  <option>Regular Cards</option>
                  <option>Holofoil Cards</option>
                  <option>Secret Rares</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {expansionData.cards.map((card) => (
                <motion.div
                  key={card.id}
                  variants={fadeInUp}
                  className="card gradient-border aspect-[3/4] relative group cursor-pointer overflow-hidden"
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedCard(card)}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-secondary)]">
                    <div className="w-16 h-16 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center mb-2">
                      <span className="text-2xl">❓</span>
                    </div>
                    <p className="text-sm font-medium">Card #{card.number}</p>
                    <p className="text-xs mt-1 text-[var(--text-secondary)]">
                      {card.isCollected ? 'Collected' : 'Not Collected'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button className="button-secondary">
                Load More Cards
              </button>
            </div>
          </motion.div>
        </section>
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