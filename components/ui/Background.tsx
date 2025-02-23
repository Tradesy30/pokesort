'use client';

import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load the Sparkles component
const Sparkles = dynamic(() => import('@/components/ui/sparkles').then(mod => mod.Sparkles), {
  ssr: false, // Disable SSR for this component since it's client-only
  loading: () => null // No loading state needed for decorative element
});

export const Background = () => {
  return (
    <>
      <div className="fixed inset-0">
        <Suspense>
          <Sparkles
            id="sparkles"
            particleColor="#60A5FA"
            particleDensity={100}
            speed={2.0}
            minSize={2.0}
            maxSize={2.5}
            particleGlow={true}
          />
        </Suspense>
      </div>

      <motion.div
        className="absolute top-20 left-10 w-64 h-64 lg:w-96 lg:h-96 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        style={{ backgroundColor: 'var(--primary)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-64 h-64 lg:w-96 lg:h-96 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        style={{ backgroundColor: 'var(--secondary)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: 2,
        }}
      />
    </>
  );
};