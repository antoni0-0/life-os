'use client';

import { ECOSYSTEM_FEATURES } from '@/lib/ecosystem-features';
import { ChartColumnIncreasing, TimerReset, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  return (
    <section className="flex w-full flex-col items-center justify-center py-8 sm:py-10 md:py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center px-2 text-center sm:px-0"
      >
        <p className="text-xs font-bold text-primary sm:text-sm">ALL-IN-ONE ECOSYSTEM</p>
        <h2 className="mt-2 mb-6 text-2xl font-medium sm:text-3xl">
          Everything you need to grow
        </h2>
      </motion.div>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
        {ECOSYSTEM_FEATURES.map((feature, index) => (
          <motion.article
            key={feature.title}
            className="flex flex-col items-start rounded-xl bg-surface p-5 sm:p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{
              scale: 1.03,
              boxShadow: `0 0 20px ${feature.color}80`,
            }}
            transition={{
              duration: 0.4 + index * 0.05,
              scale: { duration: 0.3, ease: 'easeOut' },
              boxShadow: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <img
              src={feature.icon}
              alt={`${feature.title} icon`}
              className="mb-3 h-10 w-10 rounded-[10px]"
              style={{
                boxShadow: `0 0 30px ${feature.color}80`,
                backgroundColor: `${feature.color}30`,
              }}
            />
            <h3 className="mb-2 text-base font-medium sm:text-lg">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{feature.description}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="mt-6 flex w-full flex-col items-center gap-5 rounded-xl bg-gradient-to-b from-elevated to-elevated/30 p-4 sm:mt-8 sm:gap-6 sm:p-6 md:flex-row md:items-start md:justify-start"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <img
          src="/assets/level-chart.png"
          alt="XP and level progress chart"
          className="w-full rounded-xl shadow-glow md:w-[55%]"
        />

        <div className="flex w-full max-w-[400px] flex-col items-start justify-center">
          <p className="text-xs font-bold text-primary sm:text-sm">GAMIFIED PROGRESS</p>
          <h2 className="text-2xl font-medium sm:text-3xl">Level up your life</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:mt-4 sm:text-base">
            Earn XP for every positive action you take. Stay consistent, unlock achievements and
            become your best version.
          </p>
          <ul className="mt-1 w-full">
            <li className="mt-3 flex items-center gap-2 text-sm font-medium text-text-secondary">
              <TimerReset className="h-4 w-4 shrink-0 text-primary" />
              <span>Daily and weekly challenges</span>
            </li>
            <li className="mt-3 flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Trophy className="h-4 w-4 shrink-0 text-primary" />
              <span>Streaks and achievements</span>
            </li>
            <li className="mt-3 flex items-center gap-2 text-sm font-medium text-text-secondary">
              <ChartColumnIncreasing className="h-4 w-4 shrink-0 text-primary" />
              <span>Progress tracking and insights</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
