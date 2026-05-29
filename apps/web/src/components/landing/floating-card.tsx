'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FloatingCard() {
    return (
        <motion.div
            className="flex items-center justify-between w-full max-w-[1200px] mb-6 bg-elevated/80 rounded-xl px-6 py-7 gap-6"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="flex flex-col items-start justify-center">
                <h2 className="text-3xl font-bold">Ready to build your best life?</h2>
                <p className="text-text-secondary text-xs mt-1">Join thousands of people leveling up their lives with life.os</p>
            </div>
            <motion.button
                className="bg-primary text-text-primary hover:bg-primary/90 flex items-center gap-2 px-4 py-2 rounded-lg font-medium cursor-pointer"
                animate={{
                    boxShadow: [
                        "0 0 10px #7C3AED",
                        "0 0 30px #7C3AED",
                        "0 0 10px #7C3AED",
                    ],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            >
                <span>Start for Free</span>
                <ArrowRight />
            </motion.button>
        </motion.div>
    );
}