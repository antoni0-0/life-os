'use client';

import { NAV_ITEMS } from '@/lib/ecosystem-features';
import { SIDEBAR_WIDTH } from '@/components/navbar/desktopNavbar/desktop-navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppNavbar } from '../navbar/app-navbar';

interface AppShellProps {
    children: React.ReactNode;
}

function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        const update = () => setIsDesktop(mediaQuery.matches);

        update();
        mediaQuery.addEventListener('change', update);
        return () => mediaQuery.removeEventListener('change', update);
    }, []);

    return isDesktop;
}

export function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();
    const menuId = NAV_ITEMS.find((item) => item.href === pathname)?.id ?? 1;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isDesktop = useIsDesktop();

    return (
        <div>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm lg:hidden"
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
            <motion.main
                animate={{ paddingLeft: isDesktop && sidebarOpen ? SIDEBAR_WIDTH : 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.15),transparent_35%)] text-text-primary"
            >
                <AppNavbar
                    menuId={menuId}
                    sidebarOpen={sidebarOpen}
                    onSidebarToggle={() => setSidebarOpen((open) => !open)}
                />
                {children}
            </motion.main>
        </div>
    );
}