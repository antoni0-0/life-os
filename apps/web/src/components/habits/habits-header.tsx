import { Bell, Plus, Search } from 'lucide-react';

type HabitsHeaderProps = {
  onCreateClick: () => void;
};

export function HabitsHeader({ onCreateClick }: HabitsHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between lg:hidden">
        <h1 className="text-2xl font-semibold">Habits</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCreateClick}
            className="flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary px-3 text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            New
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface text-text-secondary"
          >
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="hidden lg:block">
          <h1 className="text-2xl font-semibold lg:text-3xl">Habits</h1>
          <p className="mt-1 text-sm text-text-secondary">Build better habits. One day at a time.</p>
        </div>
        <p className="text-sm text-text-secondary lg:hidden">Build better habits. One day at a time.</p>

        <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="search"
              placeholder="Search anything..."
              className="w-full rounded-xl border border-white/10 bg-surface/80 py-2.5 pr-16 pl-10 text-sm outline-none transition focus:border-primary/40"
            />
            <kbd className="absolute top-1/2 right-3 -translate-y-1/2 rounded border border-white/10 bg-elevated px-1.5 py-0.5 text-[10px] text-text-secondary">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={onCreateClick}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-medium transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            New habit
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface text-text-secondary transition hover:text-text-primary"
          >
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-elevated text-sm font-medium">
            N
          </div>
        </div>
      </div>
    </div>
  );
}
