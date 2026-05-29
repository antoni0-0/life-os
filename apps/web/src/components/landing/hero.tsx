'use client';

import { ArrowRight, BadgeInfo, ChartNoAxesCombined } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <div
            className="w-full flex flex-col-reverse md:flex-row items-center justify-between mt-20 gap-8"
        >
            <motion.div
                className="flex flex-col items-start justify-center max-w-[600px]"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="text-primary text-sm flex items-center gap-1 bg-primary/10 rounded-xl px-3 py-1 font-bold mb-4">
                    <ChartNoAxesCombined className="h-5" />
                    <p>YOUR LIFE. UPGRADED.</p>
                </div>
                <h1 className="text-[42px] md:text-[55px] font-bold mb-6 leading-tight">
                    The operating system for your <span className="bg-gradient-to-r from-primary-orange to-secondary-purple bg-clip-text text-transparent">
                        best self
                    </span>
                </h1>
                <h2 className="text-text-secondary text-base mb-8">
                    life.os helps you build better habits, track your progress, and level up every day. Say goodbye to chaos and hello to a more organized, productive, and fulfilling life.
                </h2>
                <div className="flex gap-4 font-medium mb-2">
                    <motion.button
                        className="flex items-center gap-2 bg-gradient-to-r from-primary-orange to-secondary-purple text-white rounded-xl px-6 md:px-8 py-2 hover:brightness-110 active:scale-95 transform transition will-change-transform"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: `0 0 20px ${"white"}80`,
                        }}
                    >
                        <p>Start Your Journey</p> <ArrowRight />
                    </motion.button>
                    <motion.button
                        className="flex items-center gap-2 bg-surface border border-white/10 rounded-xl px-8 py-2 hover:border-white/30 active:scale-95 cursor-pointer"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: `0 0 50px ${"white"}80`,
                        }}
                    >
                        <p>See How It Works</p> <BadgeInfo />
                    </motion.button>
                </div>
                <h3 className="text-text-secondary text-sm">
                    Free to start. Yours forever.
                </h3>
            </motion.div>
            <motion.div
                className="w-full md:w-auto flex items-center justify-center"
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <img src="/assets/features.png" alt="Hero Image" className="max-w-[420px] md:max-w-[500px] rounded-xl" />
            </motion.div>
        </div>
    );
}