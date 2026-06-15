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
import { MoreHorizontal } from 'lucide-react';

type HabitsTableProps = {
  tasks: Task[];
  selectedTaskId: string | null;
  onSelect: (id: string) => void;
};

export function HabitsTable({ tasks, selectedTaskId, onSelect }: HabitsTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-white/5 bg-surface/60 lg:block">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/5 text-xs text-text-secondary">
            <th className="px-4 py-3 font-medium">
              <input type="checkbox" className="accent-primary" aria-label="Select all" />
            </th>
            <th className="px-4 py-3 font-medium">Habit</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Assignee</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Created</th>
            <th className="px-4 py-3 font-medium" />
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const category = getCategoryStyle(task.category);
            const statusStyle = getStatusStyles(task.status);
            const isSelected = selectedTaskId === task.id;

            return (
              <tr
                key={task.id}
                onClick={() => onSelect(task.id)}
                className={`cursor-pointer border-b border-white/5 transition hover:bg-white/5 ${
                  isSelected ? 'bg-primary/10' : ''
                }`}
              >
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="accent-primary" aria-label={`Select ${task.title}`} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={category.icon}
                      alt=""
                      className="h-9 w-9 rounded-lg"
                      style={{ backgroundColor: `${category.color}30`, boxShadow: `0 0 16px ${category.color}50` }}
                    />
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-text-secondary">{task.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img src={category.icon} alt="" className="h-5 w-5 rounded" />
                    <span className="text-text-secondary">{task.category}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-elevated text-xs font-medium">
                      {getAssigneeInitials(task)}
                    </div>
                    <span>{getAssigneeName(task)}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getPriorityStyles(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${statusStyle.badge}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                    {getStatusLabel(task.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-secondary">{formatTaskDate(task.createdAt)}</td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <button type="button" className="rounded-lg p-1 text-text-secondary hover:bg-white/5 hover:text-text-primary">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
