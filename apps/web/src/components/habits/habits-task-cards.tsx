import type { Task } from '@/types/tasks';
import {
  formatTaskDate,
  getCategoryStyle,
  getStatusLabel,
  getStatusStyles,
  getTaskDetailMeta,
} from '@/lib/habits/task-display';
import { ChevronRight } from 'lucide-react';

type HabitsTaskCardsProps = {
  tasks: Task[];
  selectedTaskId: string | null;
  onSelect: (id: string) => void;
};

export function HabitsTaskCards({ tasks, selectedTaskId, onSelect }: HabitsTaskCardsProps) {
  return (
    <div className="flex flex-col gap-3 lg:hidden">
      {tasks.map((task) => {
        const category = getCategoryStyle(task.category);
        const statusStyle = getStatusStyles(task.status);
        const meta = getTaskDetailMeta(task);
        const isSelected = selectedTaskId === task.id;

        return (
          <button
            key={task.id}
            type="button"
            onClick={() => onSelect(task.id)}
            className={`w-full rounded-xl border p-4 text-left transition ${
              isSelected ? 'border-primary/40 bg-primary/10' : 'border-white/5 bg-surface/80'
            }`}
          >
            <div className="flex items-start gap-3">
              <img
                src={category.icon}
                alt=""
                className="h-10 w-10 shrink-0 rounded-lg"
                style={{ backgroundColor: `${category.color}30`, boxShadow: `0 0 16px ${category.color}50` }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{task.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${statusStyle.badge}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                    {getStatusLabel(task.status)}
                  </span>
                  <span className="text-text-secondary">🔥 {meta.currentStreak} days</span>
                  <span className="text-text-secondary">{meta.frequency}</span>
                </div>
                <p className="mt-2 text-xs text-text-secondary">Created {formatTaskDate(task.createdAt)}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
