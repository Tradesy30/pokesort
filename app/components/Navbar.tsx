'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--surface-primary)] backdrop-blur-sm bg-opacity-80 border-b border-[rgba(255,255,255,0.05)]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-width">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo/Site Name */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PokéSort
            </motion.div>
          </Link>

          {/* Navigation Links & Auth Buttons */}
          <div className="flex items-center space-x-4">
            <motion.div
              className="hidden sm:flex items-center space-x-6 mr-4 text-[var(--text-secondary)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/features"
                className="hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                href="/about"
                className="hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                About
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/login"
                className="text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="button-primary text-sm px-4 py-2"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}