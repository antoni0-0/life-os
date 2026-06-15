'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AppNavbar } from '../navbar/app-navbar';

interface AppShellProps {
    children: React.ReactNode;
    menuId: number;
}

export function AppShell({ children, menuId }: AppShellProps) {
    return (
        <div>
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
            <main className="flex min-h-screen flex-col justify-center items-center overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.15),transparent_35%)] text-text-primary">
                <AppNavbar menuId={menuId} />
                {children}
            </main>
        </div>
    );
}