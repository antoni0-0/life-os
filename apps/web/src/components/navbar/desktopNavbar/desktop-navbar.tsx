'use client';

import { NAV_ITEMS, type NavItem } from '@/lib/ecosystem-features';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, House, PanelLeftClose, PanelLeftOpen, Star } from 'lucide-react';
import Link from 'next/link';

export const SIDEBAR_WIDTH = 240;

interface DesktopNavbarProps {
    menuId: number;
    isOpen: boolean;
    onToggle: () => void;
}

function NavItemIcon({ item, isActive }: { item: NavItem; isActive: boolean }) {
    const iconStyle = {
        boxShadow: `0 0 ${isActive ? 20 : 16}px ${item.color}80`,
        backgroundColor: `${item.color}30`,
    };

    if (item.icon) {
        return (
            <img
                src={item.icon}
                alt=""
                className="h-8 w-8 shrink-0 rounded-[8px]"
                style={iconStyle}
            />
        );
    }

    return (
        <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px]"
            style={iconStyle}
        >
            <House
                className={`h-6 w-6 ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}
            />
        </div>
    );
}

export function DesktopNavbar({ menuId, isOpen, onToggle }: DesktopNavbarProps) {
    return (
        <>
            <motion.aside
                initial={false}
                animate={{
                    width: isOpen ? SIDEBAR_WIDTH : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{
                    width: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.25, ease: 'easeOut' },
                }}
                className="fixed left-0 top-0 z-40 hidden h-screen flex-col overflow-hidden border-r border-white/5 bg-background lg:flex"
            >
                <div className="flex w-60 items-center justify-between px-5 pt-6 pb-6">
                    <Link href="/dashboard" className="flex items-center gap-2.5 transition hover:opacity-80">
                        <img src="/logos/lifeos-logo.svg" alt="life.os" className="h-9 w-9" />
                        <span className="text-lg font-medium">
                            life<span className="text-primary">.os</span>
                        </span>
                    </Link>
                    <button
                        type="button"
                        onClick={onToggle}
                        aria-label="Hide menu"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition hover:bg-white/5 hover:text-text-primary"
                    >
                        <PanelLeftClose className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex w-60 flex-1 flex-col gap-1 px-3">
                    {NAV_ITEMS.map((item) => {
                        const isActive = menuId === item.id;

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                                    isActive
                                        ? 'border border-primary/40 bg-primary/10 shadow-[0_0_20px_rgba(124,58,237,0.15)]'
                                        : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                                }`}
                            >
                                <NavItemIcon item={item} isActive={isActive} />
                                <span className={`text-sm font-medium ${isActive ? 'text-text-primary' : ''}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex w-60 flex-col gap-3 px-3 pb-5">
                    <div className="rounded-xl border border-white/10 bg-surface p-3.5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Upgrade to Pro</p>
                                <p className="text-xs text-text-secondary">Unlock all features</p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="flex w-full items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/5"
                    >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-elevated text-sm font-medium">
                            N
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium">Nicolás</p>
                            <p className="text-xs text-text-secondary">Free Plan</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-text-secondary" />
                    </button>
                </div>
            </motion.aside>

            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        type="button"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        onClick={onToggle}
                        aria-label="Show menu"
                        className="fixed top-6 left-4 z-50 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/90 px-3 py-2 text-sm font-medium text-text-secondary shadow-lg backdrop-blur-md transition hover:border-primary/30 hover:text-text-primary lg:flex"
                    >
                        <PanelLeftOpen className="h-5 w-5" />
                        <span>Menu</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
