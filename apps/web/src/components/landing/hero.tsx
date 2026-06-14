'use client';

import Link from 'next/link';
import { ArrowRight, BadgeInfo, ChartNoAxesCombined, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="flex w-full flex-col-reverse items-center justify-between gap-8 pt-6 md:flex-row md:gap-10 md:pt-0">
      <motion.div
        className="flex w-full max-w-[600px] flex-col items-start justify-center px-1 sm:px-0"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="mb-4 flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-1 text-xs font-bold text-primary sm:text-sm">
          <ChartNoAxesCombined className="h-4 w-4 sm:h-5 sm:w-5" />
          <p>YOUR LIFE. UPGRADED.</p>
        </div>

        <h1 className="mb-4 text-[2rem] font-bold leading-[1.15] sm:mb-6 sm:text-[2.5rem] md:text-[55px]">
          The operating system for your{' '}
          <span className="bg-gradient-to-r from-primary-orange to-secondary-purple bg-clip-text text-transparent">
            best self
          </span>
        </h1>

        <p className="mb-6 text-sm leading-relaxed text-text-secondary sm:mb-8 sm:text-base">
          life.os helps you build better habits, track your progress, and level up every day. Say
          goodbye to chaos and hello to a more organized, productive, and fulfilling life.
        </p>

        <div className="mb-2 flex w-full flex-col gap-3 font-medium sm:flex-row sm:gap-4">
          <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
            <Link
              href="/register"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-orange to-secondary-purple px-6 py-3 text-sm text-white transition will-change-transform hover:brightness-110 active:scale-95 sm:w-auto sm:justify-start sm:px-8 sm:py-2 sm:text-base"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255,255,255,0.5)' }}>
            <Link
              href="/login"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-surface px-6 py-3 text-sm transition hover:border-white/30 active:scale-95 sm:w-auto sm:justify-start sm:px-8 sm:py-2 sm:text-base"
            >
              <span>Log In</span>
              <LogIn className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <p className="text-xs text-text-secondary sm:text-sm">Free to start. Yours forever.</p>
      </motion.div>

      <motion.div
        className="flex w-full items-center justify-center md:w-auto"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <img
          src="/assets/features.png"
          alt="life.os dashboard preview"
          className="w-full max-w-[320px] rounded-xl sm:max-w-[380px] md:max-w-[500px]"
        />
      </motion.div>
    </section>
  );
}
