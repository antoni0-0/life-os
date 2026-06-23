'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function FloatingCard() {
  return (
    <motion.section
      className="mb-8 flex w-full max-w-[1200px] flex-col items-stretch gap-5 rounded-xl bg-elevated/80 px-4 py-6 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-7"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex flex-col items-start justify-center text-left">
        <h2 className="text-xl font-bold leading-tight sm:text-2xl md:text-3xl">
          Ready to build your best life?
        </h2>
        <p className="mt-1 text-xs text-text-secondary sm:text-sm">
          Join thousands of people leveling up their lives with life.os
        </p>
      </div>

      <motion.div
        animate={{
          boxShadow: ['0 0 10px #7C3AED', '0 0 30px #7C3AED', '0 0 10px #7C3AED'],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        className="rounded-xl"
      >
        <Link
          href="/register"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-text-primary hover:bg-primary/90 sm:w-auto sm:py-2"
        >
          <span>Start for Free</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
