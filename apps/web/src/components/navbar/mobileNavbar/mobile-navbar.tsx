'use client';

import Link from 'next/link';

interface MobileNavbarProps {
    menuItems: { id: number; label: string; href: string; icon: React.ReactNode }[];
}

export function MobileNavbar({ menuItems }: MobileNavbarProps) {
    return (
        <nav className="fixed bottom-0 z-50 w-full bg-gradient-to-t from-black/50 to-transparent backdrop-blur-sm lg:hidden">
            <div className="flex items-center justify-center gap-4 p-4 py-4">
                {menuItems.map((item) => (
                    <Link key={item.id} href={item.href} aria-label={item.label}>
                        {item.icon}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
