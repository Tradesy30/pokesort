'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname?.startsWith('/auth');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Don't show navbar on auth pages
  if (isAuthPage) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      // First try to sign out with NextAuth
      await signOut({ redirect: false });
      // Then manually redirect to home
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Sign out error:', error);
      // If sign out fails, still try to redirect to home
      router.push('/');
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              // Authenticated Navigation
              <motion.div
                className="flex items-center space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/dashboard/mobile"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="button-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                </button>
              </motion.div>
            ) : (
              // Unauthenticated Navigation
              <motion.div
                className="flex items-center space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-6 mr-4 text-[var(--text-secondary)]">
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
                </div>
                <div className="flex items-center space-x-3">
                  <Link
                    href="/auth/signin"
                    className="text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="button-primary text-sm px-4 py-2"
                  >
                    Sign Up
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <Dialog.Trigger asChild>
              <button className="md:hidden p-2 hover:bg-[var(--surface-secondary)] rounded-lg transition-colors">
                <Menu className="h-6 w-6 text-[var(--text-primary)]" />
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
              <Dialog.Content className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-[var(--surface-primary)] z-50 p-6 shadow-xl">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <Dialog.Title className="text-xl font-semibold text-[var(--text-primary)]">
                      Menu
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="p-2 hover:bg-[var(--surface-secondary)] rounded-lg transition-colors">
                        <X className="h-6 w-6 text-[var(--text-primary)]" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="flex flex-col space-y-4">
                    {session ? (
                      <>
                        <Link
                          href="/dashboard/mobile"
                          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            handleSignOut();
                          }}
                          disabled={isSigningOut}
                          className="button-primary text-sm px-4 py-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/features"
                          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Features
                        </Link>
                        <Link
                          href="/about"
                          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          About
                        </Link>
                        <div className="flex flex-col space-y-3 mt-4">
                          <Link
                            href="/auth/signin"
                            className="text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors duration-200 py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/auth/signup"
                            className="button-primary text-sm px-4 py-2 text-center"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sign Up
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </motion.nav>
  );
}