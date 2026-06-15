import { NAV_ITEMS } from '@/lib/ecosystem-features';
import { House } from 'lucide-react';
import { DesktopNavbar } from './desktopNavbar/desktop-navbar';
import { MobileNavbar } from './mobileNavbar/mobile-navbar';

interface AppNavbarProps {
    menuId: number;
    sidebarOpen: boolean;
    onSidebarToggle: () => void;
}

export function AppNavbar({ menuId, sidebarOpen, onSidebarToggle }: AppNavbarProps) {
    const menuItems = NAV_ITEMS.map((item) => ({
        ...item,
        icon: item.icon ? (
            <img
                src={item.icon}
                alt=""
                className="h-6 w-6 rounded-[6px]"
                style={{
                    boxShadow: `0 0 16px ${item.color}80`,
                    backgroundColor: `${item.color}30`,
                }}
            />
        ) : (
            <div
                className="flex h-6 w-6 items-center justify-center rounded-[6px]"
                style={{
                    boxShadow: `0 0 16px ${item.color}80`,
                    backgroundColor: `${item.color}30`,
                }}
            >
                <House
                    className="h-4 w-4"
                    style={
                        menuId === item.id
                            ? { color: 'var(--text-primary)' }
                            : { color: 'var(--text-secondary)' }
                    }
                />
            </div>
        ),
    }));

    return (
        <>
            <MobileNavbar menuItems={menuItems} />
            <DesktopNavbar menuId={menuId} isOpen={sidebarOpen} onToggle={onSidebarToggle} />
        </>
    );
}
