import type { Task } from '@/types/tasks';
import {
  formatTaskDate,
  getAssigneeInitials,
  getAssigneeName,
  getCategoryStyle,
  getPriorityLabel,
  getPriorityStyles,
  getStatusLabel,
  getStatusStyles,
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
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium">{task.title}</p>
              <ChevronRight className="h-4 w-4 shrink-0 text-text-secondary" />
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <dt className="text-text-secondary">Category</dt>
                <dd className="mt-0.5 flex items-center gap-1.5 font-medium">
                  <img src={category.icon} alt="" className="h-4 w-4 rounded" />
                  {task.category}
                </dd>
              </div>
              <div>
                <dt className="text-text-secondary">Assignee</dt>
                <dd className="mt-0.5 flex items-center gap-1.5 font-medium">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-elevated text-[10px]">
                    {getAssigneeInitials(task)}
                  </span>
                  {getAssigneeName(task)}
                </dd>
              </div>
              <div>
                <dt className="text-text-secondary">Priority</dt>
                <dd className="mt-1">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getPriorityStyles(task.priority)}`}
                  >
                    {getPriorityLabel(task.priority)}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-text-secondary">Status</dt>
                <dd className="mt-1">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${statusStyle.badge}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                    {getStatusLabel(task.status)}
                  </span>
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-text-secondary">Created</dt>
                <dd className="mt-0.5 font-medium text-text-secondary">
                  {formatTaskDate(task.createdAt)}
                </dd>
              </div>
            </dl>
          </button>
        );
      })}
    </div>
  );
}
