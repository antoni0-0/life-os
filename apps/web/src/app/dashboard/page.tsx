'use client';

import { AppShell } from '@/components/shell/app-shell';
import { ChartNoAxesCombined } from 'lucide-react';

export default function DashboardPage() {
    return (
        <AppShell menuId={1}>
            <h1 className="text-4xl font-bold">Welcome to Life<span className="bg-gradient-to-r from-primary-orange to-secondary-purple bg-clip-text text-transparent">
                OS
            </span>
            </h1>
            <div className="mt-4 flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-1 text-xs font-bold text-primary sm:text-sm">
                <ChartNoAxesCombined className="h-4 w-4 sm:h-5 sm:w-5" />
                <p>YOUR LIFE. UPGRADED.</p>
            </div>
        </AppShell>
    );
}