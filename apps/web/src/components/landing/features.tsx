'use client';

import { ChartColumnIncreasing, TimerReset, Trophy } from "lucide-react";
import { motion } from "framer-motion";


export function Features() {
    const features = [
        {
            icon: "/assets/habits-icon.png",
            title: "Habits",
            description: "Build habits that stick and track your streaks.",
            color: "#7bfb5d",
            transitionDuration: "0.3s"
        }, {
            icon: "/assets/goals-icon.png",
            title: "Goals",
            description: "Set meaningful goals and crush them step by step.",
            color: "#ffd529",
            transitionDuration: "0.5s"
        },
        {
            icon: "/assets/health-icon.png",
            title: "Health",
            description: "Move, sleep, eat better and feel your best every day.",
            color: "#ff84a7",
            transitionDuration: "0.7s"
        },
        {
            icon: "/assets/mind-icon.png",
            title: "Mind",
            description: "Improve focus, mindfulness and mental clarity.",
            color: "#58c7f9",
            transitionDuration: "0.9s"
        },
        {
            icon: "/assets/skills-icon.png",
            title: "Skills",
            description: "Learn, practice and master new skills.",
            color: "#c893f0",
            transitionDuration: "1.1s"
        },
        {
            icon: "/assets/finance-icon.png",
            title: "Finance",
            description: "Track your income, expenses and net worth.",
            color: "#7bfb5d",
            transitionDuration: "1.3s"
        }
    ];
    return (
        <div className="w-full flex flex-col items-center justify-center py-6">
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center justify-center"            
            >
                <p className="text-primary font-bold text-sm">ALL-IN-ONE ECOSYSTEM</p>
                <h2 className="text-3xl font-medium mb-6 mt-2 text-center">
                    Everything you need to grow
                </h2>
            </motion.div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col bg-surface rounded-xl p-6 mb-6 mx-2 items-start"
                        initial={{ opacity: 0, y: -80, x: 80 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: `0 0 20px ${feature.color}80`,
                        }}
                        transition={{
                            duration: index * 0.2,

                            scale: {
                                duration: 0.3,
                                ease: "easeOut",
                            },

                            boxShadow: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        }}
                    >
                        <img
                            src={feature.icon}
                            alt={`${feature.title} Icon`}
                            className={`h-10 w-10 rounded-[10px] mb-1`}
                            style={{
                                boxShadow: `0 0 30px ${feature.color}80`,
                                backgroundColor: `${feature.color}30`,
                            }}
                        />
                        <div>
                            <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                            <p className="text-text-secondary text-sm">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.div
                className="w-full flex flex-col md:flex-row justify-start bg-gradient-to-b from-elevated to-elevated/30 rounded-xl p-6 gap-6 items-center md:items-start animate-fadeUp"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 80 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <img src="/assets/level-chart.png" alt="Features Image" className="w-full md:w-[55%] rounded-xl shadow-glow" />
                <div className="max-w-[400px] flex flex-col items-start justify-center">
                    <p className="text-sm font-bold text-primary">GAMIFIED PROGRESS</p>
                    <h2 className="text-3xl font-medium">Level up your life</h2>
                    <p className="text-text-secondary text-md mt-4 leading-relaxed">
                        Earn XP for every positive action you take. Stay consistent, unlock achievements and become your best version.
                    </p>
                    <ul>
                        <li className="text-text-secondary text-sm mt-3 flex items-center gap-2 font-medium">
                            <TimerReset className="text-primary" /><span>Daily and weekly challenges</span>
                        </li>
                        <li className="text-text-secondary text-sm mt-3 flex items-center gap-2 font-medium">
                            <Trophy className="text-primary" /><span>Streaks and achievements</span>
                        </li>
                        <li className="text-text-secondary text-sm mt-3 flex items-center gap-2 font-medium">
                            <ChartColumnIncreasing className="text-primary" /><span>Progress tracking and insights</span>
                        </li>
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}