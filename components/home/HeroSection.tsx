'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./animations";

export const HeroSection = () => {
  return (
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
  );
};