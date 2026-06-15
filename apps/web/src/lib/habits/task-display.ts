import { ECOSYSTEM_FEATURES } from '@/lib/ecosystem-features';
import { TASK_FILTER_CONFIG } from '@/types/tasks';
import type { Task, TaskPriority, TaskStatus } from '@/types/tasks';

const CATEGORY_ICONS: Record<string, { icon: string; color: string }> = {
  Habits: { icon: '/assets/habits-icon.png', color: '#7bfb5d' },
  ...Object.fromEntries(
    ECOSYSTEM_FEATURES.map((f) => [f.title.toLowerCase(), { icon: f.icon, color: f.color }]),
  ),
};

const DEFAULT_CATEGORY = { icon: '/assets/habits-icon.png', color: '#7bfb5d' };

export function getCategoryStyle(category: string) {
  return CATEGORY_ICONS[category.toLowerCase()] ?? DEFAULT_CATEGORY;
}

export function getAssigneeName(task: Task) {
  return task.user.preferredName || task.user.firstName;
}

export function getAssigneeInitials(task: Task) {
  const name = getAssigneeName(task);
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function formatTaskDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function getPriorityLabel(priority: TaskPriority) {
  return TASK_FILTER_CONFIG.priority.options.find((o) => o.value === priority)?.label ?? priority;
}

export function getStatusLabel(status: TaskStatus) {
  return TASK_FILTER_CONFIG.status.options.find((o) => o.value === status)?.label ?? status;
}

export function getPriorityStyles(priority: TaskPriority) {
  switch (priority) {
    case 'HIGH':
    case 'URGENT':
      return 'bg-danger/15 text-danger border-danger/30';
    case 'MEDIUM':
      return 'bg-warning/15 text-warning border-warning/30';
    case 'LOW':
    default:
      return 'bg-success/15 text-success border-success/30';
  }
}

export function getStatusStyles(status: TaskStatus) {
  switch (status) {
    case 'IN_PROGRESS':
      return { dot: 'bg-secondary', text: 'text-secondary', badge: 'bg-secondary/15 text-secondary border-secondary/30' };
    case 'COMPLETED':
      return { dot: 'bg-success', text: 'text-success', badge: 'bg-success/15 text-success border-success/30' };
    case 'REVIEW':
      return { dot: 'bg-primary', text: 'text-primary', badge: 'bg-primary/15 text-primary border-primary/30' };
    case 'CANCELLED':
      return { dot: 'bg-danger', text: 'text-danger', badge: 'bg-danger/15 text-danger border-danger/30' };
    case 'PENDING':
    default:
      return { dot: 'bg-text-secondary', text: 'text-text-secondary', badge: 'bg-elevated text-text-secondary border-white/10' };
  }
}

export function getTaskDetailMeta(task: Task) {
  const seed = task.id.charCodeAt(0) + (task.title.length || 0);
  const currentStreak = 5 + (seed % 20);
  const bestStreak = currentStreak + (seed % 15);
  const frequencies = ['Daily', 'Weekly', 'Mon–Fri'];
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completedDays = weekDays.map((_, i) => (i + seed) % 3 !== 0);

  return {
    currentStreak,
    bestStreak,
    frequency: frequencies[seed % frequencies.length],
    weekDays,
    completedDays,
  };
}

export function computeHabitsStats(tasks: Task[]) {
  const active = tasks.filter((t) => t.status === 'IN_PROGRESS' || t.status === 'PENDING').length;
  const completedToday = tasks.filter((t) => t.status === 'COMPLETED').length;
  const streaks = tasks.map((t) => getTaskDetailMeta(t).bestStreak);
  const longestStreak = streaks.length ? Math.max(...streaks) : 0;
  const weeklyProgress = tasks.length
    ? Math.round((tasks.filter((t) => t.status === 'COMPLETED').length / tasks.length) * 100)
    : 0;

  return { active, completedToday, longestStreak, weeklyProgress };
}
