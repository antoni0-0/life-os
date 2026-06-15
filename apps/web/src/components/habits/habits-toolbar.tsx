'use client';

import { TASK_FILTER_CONFIG } from '@/types/tasks';
import type { TaskPriority, TaskStatus } from '@/types/tasks';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { HabitsFiltersState } from '@/lib/habits/habits-data';

type HabitsToolbarProps = {
  filters: HabitsFiltersState;
  onSearchChange: (search: string) => void;
  onStatusToggle: (status: TaskStatus) => void;
  onPriorityToggle: (priority: TaskPriority) => void;
  onSortChange: (sortOrder: 'asc' | 'desc') => void;
};

function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-white/10 bg-surface px-3 py-2 text-sm text-text-secondary transition hover:border-white/20 hover:text-text-primary">
        <SlidersHorizontal className="h-4 w-4" />
        {label}
        {selected.length > 0 && (
          <span className="rounded-full bg-primary/20 px-1.5 text-xs text-primary">{selected.length}</span>
        )}
      </summary>
      <div className="absolute left-0 z-20 mt-2 min-w-44 rounded-xl border border-white/10 bg-surface p-2 shadow-lg">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-white/5"
          >
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => onToggle(option.value)}
              className="accent-primary"
            />
            {option.label}
          </label>
        ))}
      </div>
    </details>
  );
}

export function HabitsToolbar({
  filters,
  onSearchChange,
  onStatusToggle,
  onPriorityToggle,
  onSortChange,
}: HabitsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-secondary" />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search habits..."
          className="w-full rounded-xl border border-white/10 bg-surface py-2.5 pr-4 pl-10 text-sm outline-none transition focus:border-primary/40"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <FilterDropdown
          label={TASK_FILTER_CONFIG.status.label}
          options={TASK_FILTER_CONFIG.status.options}
          selected={filters.status}
          onToggle={(v) => onStatusToggle(v as TaskStatus)}
        />
        <FilterDropdown
          label={TASK_FILTER_CONFIG.priority.label}
          options={TASK_FILTER_CONFIG.priority.options}
          selected={filters.priority}
          onToggle={(v) => onPriorityToggle(v as TaskPriority)}
        />
        <select
          value={filters.sortOrder}
          onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc')}
          className="rounded-xl border border-white/10 bg-surface px-3 py-2 text-sm text-text-secondary outline-none transition hover:text-text-primary"
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>
    </div>
  );
}
