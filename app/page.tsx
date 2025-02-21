'use client';

import Link from "next/link";
import { motion } from "framer-motion";

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
    <main className="min-h-screen bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
        className="absolute bottom-20 right-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
      <section className="container-width section-padding relative">
        <motion.div
          className="text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <motion.span
                className="inline-block gradient-text"
                animate={{ rotate: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                PokéSort
              </motion.span>
              <motion.span
                className="block mt-2"
                style={{ color: 'var(--secondary)' }}
                variants={fadeInUp}
              >
                Your Pokémon Collection Manager
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="mt-6 max-w-2xl mx-auto text-lg"
            style={{ color: 'var(--text-secondary)' }}
            variants={fadeInUp}
          >
            Organize and track your Pokémon collection with ease. Keep track of what you have,
            what you need, and manage your collection like never before.
          </motion.p>

          <motion.div
            className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12"
            variants={fadeInUp}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/get-started" className="button-primary">
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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              className="card group"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <motion.div
                  className="absolute top-0 right-0 p-4 text-4xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  animate={floatingAnimation}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 gradient-text">{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
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
          className="rounded-lg shadow-xl overflow-hidden"
          style={{
            background: `linear-gradient(to right, var(--gradient-start), var(--gradient-end))`,
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-12 text-center sm:px-16 relative">
            <motion.div
              className="absolute inset-0 bg-white opacity-5"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.08, 0.05]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to organize your collection?
            </motion.h2>
            <motion.p
              className="mt-4 text-lg"
              style={{ color: 'var(--text-secondary)' }}
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
              className="mt-8 inline-block"
            >
              <Link href="/get-started" className="button-secondary">
                Start Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
