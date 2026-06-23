'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const tabs = ['Features', 'How it Works', 'Benefits', 'About Us', 'Contact'];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm lg:backdrop-blur-none"
      >
        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="flex items-center transition hover:opacity-80">
            <img src="/logos/lifeos-logo.svg" alt="life.os" className="mr-2 h-9 w-9 sm:h-10 sm:w-10" />
            <h1 className="text-xl sm:text-2xl">
              life<span className="text-primary">.os</span>
            </h1>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                className="cursor-pointer text-text-secondary transition hover:text-text-primary"
                // TODO: Add onClick handler to navigate to the corresponding section
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/login"
              className="cursor-pointer rounded-xl border border-white/10 bg-surface px-8 py-2 font-medium text-text-secondary transition hover:border-white/30 hover:text-text-primary active:scale-95"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="cursor-pointer rounded-xl bg-gradient-to-r from-primary-orange to-secondary-purple px-8 py-2 font-medium hover:brightness-110 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface text-text-primary transition hover:border-white/30 active:scale-95 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0}}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <nav
              className="fixed left-4 right-4 top-[4.5rem] z-50 flex flex-col gap-1 rounded-2xl bg-surface p-4 shadow-card backdrop-blur-md sm:left-6 sm:right-6 lg:hidden"
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-left text-base font-medium text-text-secondary transition hover:bg-elevated hover:text-text-primary active:scale-[0.98]"
                >
                  {tab}
                </button>
              ))}

              <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full rounded-xl border border-white/10 bg-elevated px-4 py-3 text-center font-medium text-text-primary transition hover:border-white/30 active:scale-95"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full rounded-xl bg-gradient-to-r from-primary-orange to-secondary-purple px-4 py-3 text-center font-medium transition hover:brightness-110 active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
