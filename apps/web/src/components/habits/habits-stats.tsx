import type { Task } from '@/types/tasks';
import { Activity, CheckCircle2, Flame, Target } from 'lucide-react';
import { computeHabitsStats } from '@/lib/habits/task-display';

type HabitsStatsProps = {
  tasks: Task[];
};

const statCards = [
  { key: 'active', label: 'Active habits', icon: Activity, trend: '▲ 2 vs last week', accent: 'text-primary' },
  { key: 'completedToday', label: 'Completed today', icon: CheckCircle2, trend: '▲ 18% vs yesterday', accent: 'text-success' },
  { key: 'longestStreak', label: 'Longest streak', icon: Flame, trend: 'Keep it up!', accent: 'text-secondary' },
  { key: 'weeklyProgress', label: 'Weekly progress', icon: Target, trend: '▲ 12% vs last week', accent: 'text-secondary' },
] as const;

export function HabitsStats({ tasks }: HabitsStatsProps) {
  const stats = computeHabitsStats(tasks);

  const values: Record<string, string> = {
    active: String(stats.active),
    completedToday: String(stats.completedToday),
    longestStreak: `${stats.longestStreak} days`,
    weeklyProgress: `${stats.weeklyProgress}%`,
  };

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className="rounded-xl border border-white/5 bg-surface/80 p-4 backdrop-blur-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-text-secondary">{card.label}</span>
              <Icon className={`h-4 w-4 ${card.accent}`} />
            </div>
            <p className="text-2xl font-semibold">{values[card.key]}</p>
            <p className="mt-1 text-xs text-text-secondary">{card.trend}</p>
            {card.key === 'weeklyProgress' && (
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-elevated">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-secondary to-primary"
                  style={{ width: `${stats.weeklyProgress}%` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
