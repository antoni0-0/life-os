'use client';

import { motion } from 'framer-motion';
import { ChartNoAxesCombined } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col justify-center items-center overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.15),transparent_35%)] text-text-primary">
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
                </div>
            </motion.header>
            <h1 className="text-4xl font-bold">Welcome to Life<span className="bg-gradient-to-r from-primary-orange to-secondary-purple bg-clip-text text-transparent">
                OS
            </span>
            </h1>
            <div className="mt-4 flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-1 text-xs font-bold text-primary sm:text-sm">
                <ChartNoAxesCombined className="h-4 w-4 sm:h-5 sm:w-5" />
                <p>YOUR LIFE. UPGRADED.</p>
            </div>
        </div>
    );
}