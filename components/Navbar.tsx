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
      await signOut({ redirect: false });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Sign out error:', error);
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
        <div className="flex items-center h-16 px-4 sm:px-6 lg:px-8">
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
          {session ? (
            <>
              {/* Center Navigation Links - Hidden on Mobile and Tablet */}
              <motion.div
                className="flex-1 hidden lg:flex justify-center items-center space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/dashboard"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-lg font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/deck"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-lg font-medium"
                >
                  Deck
                </Link>
                <Link
                  href="/profile"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-lg font-medium"
                >
                  Profile
                </Link>
              </motion.div>

              {/* Empty div for mobile/tablet spacing */}
              <div className="flex-1 lg:hidden"></div>

              {/* Right-aligned Sign Out Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="hidden lg:block"
              >
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="button-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                </button>
              </motion.div>
            </>
          ) : (
            <div className="flex-1 flex justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="hidden lg:block"
              >
                <Link
                  href="/auth/signin"
                  className="button-primary text-sm px-4 py-2"
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          )}

          {/* Mobile/Tablet Menu Button */}
          <button className="lg:hidden p-2 hover:bg-[var(--surface-secondary)] rounded-lg transition-colors ml-4">
            <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <Dialog.Trigger asChild>
                <Menu className="h-6 w-6 text-[var(--text-primary)]" />
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

                    {session ? (
                      <div className="flex flex-col h-full">
                        {/* Navigation Links */}
                        <div className="flex flex-col space-y-4">
                          <Link
                            href="/dashboard"
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/deck"
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Deck
                          </Link>
                          <Link
                            href="/profile"
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Profile
                          </Link>
                        </div>

                        {/* Sign Out Button at Bottom */}
                        <div className="mt-auto pt-4 border-t border-[var(--border-primary)]">
                          <button
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              handleSignOut();
                            }}
                            disabled={isSigningOut}
                            className="w-full button-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href="/auth/signin"
                        className="button-primary text-sm px-4 py-2 text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    )}
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}