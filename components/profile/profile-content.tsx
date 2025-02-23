'use client';

import { motion } from 'framer-motion';
import { Trophy, Zap, Star } from 'lucide-react';

const COLLECTION_HIGHLIGHTS = [
  {
    id: 'highlight-1',
    name: 'Charizard VMAX',
    number: '074',
    type: 'Fire',
    rarity: 'Ultra Rare',
    image: '🔥'
  },
  {
    id: 'highlight-2',
    name: 'Pikachu VMAX',
    number: '044',
    type: 'Electric',
    rarity: 'Ultra Rare',
    image: '⚡'
  },
  {
    id: 'highlight-3',
    name: 'Mewtwo V',
    number: '072',
    type: 'Psychic',
    rarity: 'Ultra Rare',
    image: '🔮'
  }
];

const RECENT_ACTIVITY = [
  {
    id: 1,
    type: 'achievement',
    title: 'Elite Collector Badge',
    description: 'Collected 100 unique cards',
    icon: <Trophy className="w-5 h-5" />,
    time: '2 days ago'
  },
  {
    id: 2,
    type: 'collection',
    title: 'Rare Card Added',
    description: 'Added Charizard VMAX to collection',
    icon: <Star className="w-5 h-5" />,
    time: '3 days ago'
  },
  {
    id: 3,
    type: 'trade',
    title: 'Successful Trade',
    description: 'Traded Pikachu V for Mewtwo V',
    icon: <Zap className="w-5 h-5" />,
    time: '1 week ago'
  }
];

export function ProfileContent() {
  return (
    <div className="space-y-8">
      {/* Collection Highlights */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
          Collection Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLLECTION_HIGHLIGHTS.map((card) => (
            <motion.div
              key={card.id}
              className="card gradient-border p-4 flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--surface-primary)] flex items-center justify-center text-2xl">
                {card.image}
              </div>
              <div>
                <h3 className="font-medium text-[var(--text-primary)]">{card.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  #{card.number} • {card.rarity}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {RECENT_ACTIVITY.map((activity) => (
            <motion.div
              key={activity.id}
              className="card gradient-border p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[var(--surface-primary)] text-[var(--text-secondary)]">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-medium text-[var(--text-primary)]">
                      {activity.title}
                    </h3>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {activity.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Overview */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
          Collection Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card gradient-border p-4">
            <h3 className="text-sm text-[var(--text-secondary)]">Total Cards</h3>
            <p className="text-2xl font-bold gradient-text mt-1">248</p>
          </div>
          <div className="card gradient-border p-4">
            <h3 className="text-sm text-[var(--text-secondary)]">Completed Sets</h3>
            <p className="text-2xl font-bold gradient-text mt-1">3</p>
          </div>
          <div className="card gradient-border p-4">
            <h3 className="text-sm text-[var(--text-secondary)]">Collector Score</h3>
            <p className="text-2xl font-bold gradient-text mt-1">1,250</p>
          </div>
        </div>
      </section>
    </div>
  );
}