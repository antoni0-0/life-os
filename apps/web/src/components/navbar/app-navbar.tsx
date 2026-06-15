import { motion } from "framer-motion";
import { CircleCheckBig, CircleUserRound, House } from "lucide-react";
import Link from "next/link";

interface AppNavbarProps {
    menuId: number;
}


export function AppNavbar({ menuId }: AppNavbarProps) {
    const menuItems = [
        {
            id: 1,
            label: "Home",
            href: "/dashboard",
            icon: <House className="h-6 w-6" style={menuId === 1 ? { color: "var(--text-primary)" } : { color: "var(--text-secondary)" }} />,
        },
        {
            id: 2,
            label: "Habits",
            href: "/habits",
            icon: <CircleCheckBig className="h-6 w-6" style={menuId === 2 ? { color: "var(--color-success)" } : { color: "var(--text-secondary)" }} />
        },
        {
            id: 3,
            label: "Profile",
            href: "/habits",
            icon: <CircleUserRound className="h-6 w-6" style={menuId === 3 ? { color: "var(--text-primary)" } : { color: "var(--text-secondary)" }} />
        }
    ];
    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-0 z-50 w-full bg-gradient-to-t from-black/50 to-transparent backdrop-blur-sm lg:backdrop-blur-none"
        >
            <div className="flex items-center justify-center gap-4 p-4 py-4">
                {menuItems.map((item) => (
                    <Link key={item.id} href={item.href}>
                        {item.icon}
                    </Link>
                ))}
            </div>
        </motion.nav>
    );
}