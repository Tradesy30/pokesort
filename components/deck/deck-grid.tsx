'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// This would typically come from your database
const MOCK_CARDS = [
  { id: 'card-1', name: 'Pokémon #1', number: '001', type: 'Fire', rarity: 'Common' },
  { id: 'card-2', name: 'Pokémon #2', number: '002', type: 'Water', rarity: 'Common' },
  { id: 'card-3', name: 'Pokémon #3', number: '003', type: 'Grass', rarity: 'Uncommon' },
  { id: 'card-4', name: 'Pokémon #4', number: '004', type: 'Electric', rarity: 'Uncommon' },
  { id: 'card-5', name: 'Pokémon #5', number: '005', type: 'Fire', rarity: 'Rare' },
  { id: 'card-6', name: 'Pokémon #6', number: '006', type: 'Water', rarity: 'Rare' },
  { id: 'card-7', name: 'Pokémon #7', number: '007', type: 'Grass', rarity: 'Ultra Rare' },
  { id: 'card-8', name: 'Pokémon #8', number: '008', type: 'Electric', rarity: 'Ultra Rare' },
  { id: 'card-9', name: 'Pokémon #9', number: '009', type: 'Fire', rarity: 'Common' },
  { id: 'card-10', name: 'Pokémon #10', number: '010', type: 'Water', rarity: 'Uncommon' },
  { id: 'card-11', name: 'Pokémon #11', number: '011', type: 'Grass', rarity: 'Rare' },
  { id: 'card-12', name: 'Pokémon #12', number: '012', type: 'Electric', rarity: 'Ultra Rare' },
];

export function DeckGrid() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
      {MOCK_CARDS.map((card) => (
        <motion.div
          key={card.id}
          layoutId={card.id}
          onClick={() => setSelectedCard(card.id)}
          className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer group relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Card Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-primary)] to-[var(--surface-secondary)] border border-[var(--border-primary)]" />

          {/* Card Content */}
          <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[var(--surface-secondary)] flex items-center justify-center mb-3">
              <span className="text-2xl">
                {card.type === 'Fire' ? '🔥' :
                 card.type === 'Water' ? '💧' :
                 card.type === 'Grass' ? '🌿' : '⚡'}
              </span>
            </div>

            <h3 className="text-sm font-medium text-[var(--text-primary)] text-center">
              {card.name}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              #{card.number}
            </p>
            <div className="mt-2 px-2 py-1 rounded-full bg-[var(--surface-primary)] text-xs text-[var(--text-secondary)]">
              {card.type}
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm font-medium">View Details</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}