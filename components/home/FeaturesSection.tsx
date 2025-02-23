'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, floatingAnimation } from "./animations";

const features = [
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
];

export const FeaturesSection = () => {
  return (
    <motion.section
      className="container-width section-padding"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
        {features.map((feature) => (
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
  );
};