'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export const CallToAction = () => {
  return (
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
  );
};