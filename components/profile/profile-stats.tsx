'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target, Award, Crown } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'Elite Collector',
    description: 'Collected over 100 unique cards',
    icon: <Crown className="w-5 h-5" />,
    progress: 100,
    total: 100,
    completed: true
  },
  {
    id: 2,
    title: 'Set Master',
    description: 'Complete 5 full card sets',
    icon: <Star className="w-5 h-5" />,
    progress: 3,
    total: 5,
    completed: false
  },
  {
    id: 3,
    title: 'Trading Pro',
    description: 'Complete 50 successful trades',
    icon: <Zap className="w-5 h-5" />,
    progress: 45,
    total: 50,
    completed: false
  }
];

export function ProfileStats() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="card gradient-border p-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[var(--text-secondary)]" />
          Quick Stats
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[var(--text-secondary)]">Collection Progress</span>
              <span className="text-[var(--text-primary)]">85%</span>
            </div>
            <div className="h-2 bg-[var(--surface-primary)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--primary)]"
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[var(--text-secondary)]">Trade Rating</span>
              <span className="text-[var(--text-primary)]">4.8/5.0</span>
            </div>
            <div className="flex text-[var(--primary)]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star > 4.8 ? 'text-[var(--surface-secondary)]' : ''}`}
                  fill={star <= 4.8 ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card gradient-border p-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-[var(--text-secondary)]" />
          Achievements
        </h2>
        <div className="space-y-4">
          {ACHIEVEMENTS.map((achievement) => (
            <div key={achievement.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  achievement.completed
                    ? 'bg-[var(--primary)] bg-opacity-10 text-[var(--primary)]'
                    : 'bg-[var(--surface-primary)] text-[var(--text-secondary)]'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[var(--text-primary)]">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {achievement.description}
                  </p>
                </div>
                <div className="text-sm font-medium text-[var(--text-primary)]">
                  {achievement.progress}/{achievement.total}
                </div>
              </div>
              <div className="h-1.5 bg-[var(--surface-primary)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--primary)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="card gradient-border p-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[var(--text-secondary)]" />
          Collection Goals
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Next Milestone</span>
            <span className="text-[var(--text-primary)] font-medium">300 Cards</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Sets to Complete</span>
            <span className="text-[var(--text-primary)] font-medium">2</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Trading Goal</span>
            <span className="text-[var(--text-primary)] font-medium">5 More</span>
          </div>
        </div>
      </div>
    </div>
  );
}