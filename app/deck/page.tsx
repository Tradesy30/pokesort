'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { PageBackground } from '@/components/ui/page-background';
import { PokemonCardModal } from '@/components/pokemon/PokemonCardModal';

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

// Mock deck data - In a real app, this would come from an API or database
const MOCK_DECKS = [
  {
    id: 'deck-1',
    name: 'Fire Power',
    description: 'A deck focused on Fire-type Pokémon',
    cards: 60,
    mainPokemon: 'Charizard',
    winRate: '65%',
    type: 'Fire',
  },
  {
    id: 'deck-2',
    name: 'Water Warriors',
    description: 'Strong Water-type combination',
    cards: 60,
    mainPokemon: 'Blastoise',
    winRate: '58%',
    type: 'Water',
  },
  {
    id: 'deck-3',
    name: 'Nature Force',
    description: 'Grass-type strategy deck',
    cards: 60,
    mainPokemon: 'Venusaur',
    winRate: '60%',
    type: 'Grass',
  },
];

// Mock cards for the deck builder
const MOCK_CARDS = [...Array(20)].map((_, i) => ({
  id: `card-${i + 1}`,
  number: String(i + 1).padStart(3, '0'),
  name: `Pokémon #${i + 1}`,
  type: ['Fire', 'Water', 'Grass', 'Electric', 'Psychic'][Math.floor(Math.random() * 5)],
  rarity: ['Common', 'Uncommon', 'Rare', 'Ultra Rare'][Math.floor(Math.random() * 4)],
  variant: Math.random() > 0.7 ? 'Holofoil' : undefined,
  isCollected: true,
}));

export default function DeckPage() {
  const { data: session, status } = useSession();
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    number: string;
    name: string;
    type: string;
    rarity: string;
    variant?: string;
    isCollected: boolean;
    imageUrl?: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState('my-decks'); // 'my-decks' or 'deck-builder'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-20">
      {/* Background Effects */}
      <PageBackground />

      <div className="container-width">
        {/* Page Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-8"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-bold gradient-text mb-2"
          >
            Deck Manager
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-[var(--text-secondary)]"
          >
            Build and manage your Pokémon card decks
          </motion.p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          variants={fadeInUp}
          className="flex space-x-4 mb-6"
        >
          <button
            onClick={() => setActiveTab('my-decks')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'my-decks'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            My Decks
          </button>
          <button
            onClick={() => setActiveTab('deck-builder')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'deck-builder'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Deck Builder
          </button>
        </motion.div>

        {/* My Decks View */}
        {activeTab === 'my-decks' && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Create New Deck Card */}
            <motion.div
              variants={fadeInUp}
              className="card gradient-border p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => setActiveTab('deck-builder')}
            >
              <div className="w-16 h-16 rounded-full bg-[var(--surface-primary)] flex items-center justify-center mb-4">
                <span className="text-3xl">➕</span>
              </div>
              <h3 className="text-lg font-medium text-[var(--text-primary)]">Create New Deck</h3>
              <p className="text-sm text-[var(--text-secondary)] text-center mt-2">
                Start building a new Pokémon deck
              </p>
            </motion.div>

            {/* Existing Decks */}
            {MOCK_DECKS.map((deck) => (
              <motion.div
                key={deck.id}
                variants={fadeInUp}
                className="card gradient-border p-6 cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-[var(--text-primary)]">{deck.name}</h3>
                  <span className="text-2xl">{deck.type === 'Fire' ? '🔥' : deck.type === 'Water' ? '💧' : '🌿'}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{deck.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Cards:</span>
                    <span className="text-[var(--text-primary)]">{deck.cards}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Main Pokémon:</span>
                    <span className="text-[var(--text-primary)]">{deck.mainPokemon}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Win Rate:</span>
                    <span className="text-[var(--text-primary)]">{deck.winRate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Deck Builder View */}
        {activeTab === 'deck-builder' && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Search and Filter */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg px-4 py-2 border border-[var(--surface-primary)] focus:outline-none focus:border-[var(--primary)]"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full sm:w-48 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg px-3 py-2 border border-[var(--surface-primary)] focus:outline-none focus:border-[var(--primary)]"
              >
                <option value="all">All Types</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
                <option value="psychic">Psychic</option>
              </select>
            </motion.div>

            {/* Cards Grid */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {MOCK_CARDS.map((card) => (
                <motion.div
                  key={card.id}
                  variants={fadeInUp}
                  className="card gradient-border aspect-[3/4] relative group cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedCard(card)}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-secondary)]">
                    <div className="w-16 h-16 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center mb-2">
                      <span className="text-2xl">❓</span>
                    </div>
                    <p className="text-sm font-medium">#{card.number}</p>
                    <p className="text-xs mt-1">{card.name}</p>
                    <p className="text-xs mt-1 text-[var(--text-primary)]">{card.type}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
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