'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { PageBackground } from '@/components/ui/page-background';
import { AchievementsPanel } from '@/components/achievements/AchievementsPanel';
import { PokemonCardModal } from '@/components/pokemon/PokemonCardModal';
import Link from 'next/link';

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

// Mock user stats - In a real app, this would come from an API
const USER_STATS = {
  collectionSize: 248,
  completedSets: 3,
  totalTrades: 45,
  collectorScore: 1250,
  memberSince: '2024',
  rank: 'Elite Collector',
  favoriteType: 'Fire',
  rarest: 'Charizard VMAX (Rainbow)',
};

// Mock collection highlights
const COLLECTION_HIGHLIGHTS = [...Array(6)].map((_, i) => ({
  id: `highlight-${i + 1}`,
  number: String(i + 1).padStart(3, '0'),
  name: `Rare Pokémon #${i + 1}`,
  type: ['Fire', 'Water', 'Grass', 'Electric', 'Psychic'][Math.floor(Math.random() * 5)],
  rarity: 'Ultra Rare',
  variant: 'Holofoil',
  isCollected: true,
}));

export default function ProfilePage() {
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
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'achievements' or 'collection'

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
        {/* Profile Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-8"
        >
          <div className="flex items-center gap-6">
            <motion.div
              variants={fadeInUp}
              className="w-24 h-24 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center overflow-hidden"
            >
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.username || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl">👤</span>
              )}
            </motion.div>
            <div>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl font-bold gradient-text"
              >
                {session?.user?.username || 'Trainer'}
              </motion.h1>
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-3 mt-2"
              >
                <span className="text-[var(--text-secondary)]">{USER_STATS.rank}</span>
                <span className="text-[var(--text-secondary)]">•</span>
                <span className="text-[var(--text-secondary)]">Member since {USER_STATS.memberSince}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          variants={fadeInUp}
          className="flex space-x-4 mb-6"
        >
          {['overview', 'achievements', 'collection'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Stats Grid */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {[
                { label: 'Collection Size', value: USER_STATS.collectionSize },
                { label: 'Completed Sets', value: USER_STATS.completedSets },
                { label: 'Total Trades', value: USER_STATS.totalTrades },
                { label: 'Collector Score', value: USER_STATS.collectorScore },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="card gradient-border p-4"
                >
                  <h3 className="text-sm text-[var(--text-secondary)]">{stat.label}</h3>
                  <p className="text-2xl font-bold gradient-text mt-1">{stat.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Collection Details */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <div className="card gradient-border p-6">
                <h2 className="text-xl font-bold gradient-text mb-4">Collection Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Favorite Type</span>
                    <span className="text-[var(--text-primary)]">{USER_STATS.favoriteType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Rarest Card</span>
                    <span className="text-[var(--text-primary)]">{USER_STATS.rarest}</span>
                  </div>
                </div>
              </div>

              <div className="card gradient-border p-6">
                <h2 className="text-xl font-bold gradient-text mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {[
                    { text: 'Completed Base Set collection', time: '2 days ago' },
                    { text: 'Traded Pikachu V for Charizard', time: '5 days ago' },
                    { text: 'Earned Elite Collector badge', time: '1 week ago' },
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">{activity.text}</span>
                      <span className="text-[var(--text-primary)] text-sm">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Collection Highlights */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-bold gradient-text mb-4">Collection Highlights</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {COLLECTION_HIGHLIGHTS.map((card) => (
                  <motion.div
                    key={card.id}
                    variants={fadeInUp}
                    className="card gradient-border aspect-[3/4] relative group cursor-pointer"
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedCard(card)}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-secondary)]">
                      <div className="w-16 h-16 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center mb-2">
                        <span className="text-2xl">✨</span>
                      </div>
                      <p className="text-sm font-medium">#{card.number}</p>
                      <p className="text-xs mt-1">{card.name}</p>
                      <p className="text-xs mt-1 text-[var(--text-primary)]">{card.type}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="card gradient-border p-6"
          >
            <AchievementsPanel />
          </motion.div>
        )}

        {/* Collection Tab */}
        {activeTab === 'collection' && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold gradient-text">Complete Collection</h2>
              <Link
                href="/dashboard"
                className="button-secondary text-sm px-4 py-2"
              >
                View in Pokédex
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={`collection-${i}`}
                  variants={fadeInUp}
                  className="card gradient-border aspect-[3/4] relative group cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-secondary)]">
                    <div className="w-16 h-16 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center mb-2">
                      <span className="text-2xl">❓</span>
                    </div>
                    <p className="text-sm font-medium">#{String(i + 1).padStart(3, '0')}</p>
                    <p className="text-xs mt-1">Pokémon #{i + 1}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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