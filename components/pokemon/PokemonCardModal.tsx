'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface PokemonCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: {
    id: string;
    number: string;
    name: string;
    type: string;
    rarity: string;
    variant?: string;
    isCollected: boolean;
    imageUrl?: string;
  };
}

export function PokemonCardModal({ isOpen, onClose, card }: PokemonCardModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-2xl relative"
              >
                <div className="card gradient-border overflow-hidden bg-[var(--bg-primary)]">
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="p-6">
                    {/* Card Image and Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Card Image */}
                      <div className="aspect-[3/4] rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                        {card.imageUrl ? (
                          <img
                            src={card.imageUrl}
                            alt={card.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-6xl">❓</div>
                        )}
                      </div>

                      {/* Card Details */}
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold gradient-text">{card.name}</h2>
                          <p className="text-[var(--text-secondary)]">#{card.number}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-2 border-b border-[var(--surface-primary)]">
                            <span className="text-[var(--text-secondary)]">Type</span>
                            <span className="text-[var(--text-primary)] font-medium">{card.type}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-[var(--surface-primary)]">
                            <span className="text-[var(--text-secondary)]">Rarity</span>
                            <span className="text-[var(--text-primary)] font-medium">{card.rarity}</span>
                          </div>
                          {card.variant && (
                            <div className="flex justify-between items-center py-2 border-b border-[var(--surface-primary)]">
                              <span className="text-[var(--text-secondary)]">Variant</span>
                              <span className="text-[var(--text-primary)] font-medium">{card.variant}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center py-2 border-b border-[var(--surface-primary)]">
                            <span className="text-[var(--text-secondary)]">Status</span>
                            <span className={`font-medium ${card.isCollected ? 'text-emerald-500' : 'text-red-500'}`}>
                              {card.isCollected ? 'Collected' : 'Not Collected'}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-6">
                          <button
                            onClick={() => {/* Toggle collection status */}}
                            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                              card.isCollected
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                            }`}
                          >
                            {card.isCollected ? 'Remove from Collection' : 'Add to Collection'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}