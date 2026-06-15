import { TASK_FILTER_CONFIG } from '@/types/tasks';
import type { HabitsFiltersState } from '@/lib/habits/habits-data';
import { X } from 'lucide-react';

type HabitsActiveFiltersProps = {
  filters: HabitsFiltersState;
  onRemoveStatus: (status: HabitsFiltersState['status'][number]) => void;
  onClearPriority: () => void;
  onClear: () => void;
};

export function HabitsActiveFilters({
  filters,
  onRemoveStatus,
  onClearPriority,
  onClear,
}: HabitsActiveFiltersProps) {
  const hasFilters = filters.status.length > 0 || filters.priority.length > 0;
  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.status.map((status) => {
        const label = TASK_FILTER_CONFIG.status.options.find((o) => o.value === status)?.label;
        return (
          <button
            key={status}
            type="button"
            onClick={() => onRemoveStatus(status)}
            className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-text-primary"
          >
            Status: {label}
            <X className="h-3 w-3" />
          </button>
        );
      })}
      {filters.priority.length > 0 && (
        <button
          type="button"
          onClick={onClearPriority}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-elevated px-3 py-1 text-xs text-text-secondary"
        >
          Priority:{' '}
          {filters.priority
            .map((p) => TASK_FILTER_CONFIG.priority.options.find((o) => o.value === p)?.label)
            .join(', ')}
          <X className="h-3 w-3" />
        </button>
      )}
      <button
        type="button"
        onClick={onClear}
        className="text-xs text-primary transition hover:underline"
      >
        Clear filters
      </button>
    </div>
  );
}
