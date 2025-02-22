'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const rarityColors = {
  common: 'from-blue-400 to-blue-600',
  rare: 'from-purple-400 to-purple-600',
  epic: 'from-pink-400 to-pink-600',
  legendary: 'from-amber-400 to-amber-600'
};

export function AchievementsPanel() {
  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Starter Collector',
      description: 'Collect your first 10 Pokémon cards',
      progress: 5,
      total: 10,
      icon: '🎴',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Set Completer',
      description: 'Complete your first expansion set',
      progress: 45,
      total: 150,
      icon: '📚',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Master Collector',
      description: 'Complete a master set with all variants',
      progress: 75,
      total: 300,
      icon: '👑',
      rarity: 'legendary'
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-bold gradient-text">Achievements</h2>
        <button className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          View All
        </button>
      </div>

      <div className="grid gap-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            variants={fadeInUp}
            className="card gradient-border p-4"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${rarityColors[achievement.rarity]} flex items-center justify-center`}>
                <span className="text-2xl">{achievement.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-[var(--text-primary)]">{achievement.title}</h3>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {achievement.progress}/{achievement.total}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{achievement.description}</p>
                <div className="w-full h-2 rounded-full bg-[var(--bg-tertiary)] mt-2">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${rarityColors[achievement.rarity]}`}
                    style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}