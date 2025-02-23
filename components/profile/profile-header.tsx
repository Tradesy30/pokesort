'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Settings, Edit } from 'lucide-react';

export function ProfileHeader() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* User Info */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-[var(--surface-primary)] border-2 border-[var(--border-primary)] overflow-hidden">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">
                👤
              </div>
            )}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Edit className="w-4 h-4 text-[var(--text-primary)]" />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold gradient-text">
              {session?.user?.name || 'Trainer'}
            </h1>
            <button className="p-2 hover:bg-[var(--surface-secondary)] rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
          </div>
          <p className="text-[var(--text-secondary)] mt-1">
            Elite Trainer • Member since 2024
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 border-b border-[var(--border-primary)]">
        {['Overview', 'Collection', 'Achievements', 'Settings'].map((tab) => {
          const isActive = activeTab === tab.toLowerCase();
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                isActive
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}