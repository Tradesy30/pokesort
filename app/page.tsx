'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from '@/app/components/ui/sparkles';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 z-0">
        <Sparkles
          id="sparkles"
          particleColor="#60A5FA"
          particleDensity={100}
          speed={0.6}
          minSize={1.2}
          maxSize={2.5}
          particleGlow={true}
        />
      </div>

      {/* Content Container with higher z-index */}
      <div className="relative z-10">
        {/* Decorative Elements */}
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

        {/* Hero Section */}
        <section className="container-width min-h-[80vh] flex items-center justify-center section-padding relative">
          <motion.div
            className="text-center max-w-[90%] xl:max-w-[80%] mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
                <motion.span
                  className="inline-block gradient-text"
                  animate={{ rotate: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  PokéSort
                </motion.span>
                <motion.span
                  className="block mt-2 sm:mt-4"
                  style={{ color: 'var(--secondary)' }}
                  variants={fadeInUp}
                >
                  Your Pokémon Collection Manager
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              className="mt-6 sm:mt-8 max-w-2xl mx-auto text-lg sm:text-xl lg:text-2xl lg:max-w-3xl"
              style={{ color: 'var(--text-secondary)' }}
              variants={fadeInUp}
            >
              Organize and track your Pokémon collection with ease. Keep track of what you have,
              what you need, and manage your collection like never before.
            </motion.p>

            <motion.div
              className="mt-10 sm:mt-12 max-w-md mx-auto sm:flex sm:justify-center"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/dashboard" className="button-primary text-lg lg:text-xl lg:px-12 lg:py-4">
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <motion.section
          className="container-width section-padding"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
            {[
              {
                title: "Easy Organization",
                description: "Sort your Pokémon by type, generation, or any criteria you prefer. Finding specific Pokémon has never been easier.",
                icon: "🔍"
              },
              {
                title: "Collection Tracking",
                description: "Keep track of your entire collection in one place. Know exactly what you have and what you're missing.",
                icon: "📊"
              },
              {
                title: "Smart Search",
                description: "Powerful search and filter options to help you find exactly what you're looking for in your collection.",
                icon: "⚡"
              }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                className="card group gradient-border lg:p-2"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="p-6 lg:p-8">
                  <motion.div
                    className="absolute top-4 right-4 p-4 text-4xl lg:text-5xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                    animate={floatingAnimation}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 gradient-text">{feature.title}</h3>
                  <p className="text-[var(--text-secondary)] lg:text-lg">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="container-width section-padding"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="card gradient-border overflow-hidden lg:max-w-5xl lg:mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-12 sm:px-16 lg:px-20 lg:py-16 text-center relative">
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Ready to organize your collection?
              </motion.h2>
              <motion.p
                className="mt-4 lg:mt-6 text-lg lg:text-xl text-[var(--text-secondary)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Join now and start managing your Pokémon collection like a pro.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 lg:mt-10 inline-block"
              >
                <Link href="/dashboard" className="button-primary text-lg lg:text-xl lg:px-12 lg:py-4">
                  Start Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
