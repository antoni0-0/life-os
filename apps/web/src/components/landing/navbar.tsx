'use client';
import { motion } from 'framer-motion';

export function Navbar() {
  const tabs = ['Features', 'How it Works', 'Benefits', 'About Us', 'Contact'];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-b from-black/70 to-transparent fixed top-0"
    >
      <div className="flex w-full items-center justify-between px-6 py-4">
        <div className='flex items-center'>
          <img src="/logos/lifeos-logo.svg" alt="life.os" className="h-10 w-10 mr-2" />
          <h1 className="text-2xl">
            life<span className="text-primary">.os</span>
          </h1>
        </div>
        <div className='flex items-center gap-8'>
          {tabs.map((tab) => (
            <button
              key={tab}
              className="text-text-secondary hover:text-text-primary transition cursor-pointer"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="text-text-secondary transition bg-surface hover:text-text-primary border border-white/10 rounded-xl px-8 py-2 hover:border-white/30 active:scale-95 cursor-pointer font-medium">
            Log In
          </button>

          <button className="rounded-xl bg-gradient-to-r from-primary-orange to-secondary-purple px-8 py-2 font-medium hover:brightness-110 active:scale-95 cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </motion.header>
  );
}