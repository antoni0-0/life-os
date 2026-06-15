import type { TaskPriority, TaskStatus } from '@/types/tasks';

export type HabitsFiltersState = {
  search: string;
  status: TaskStatus[];
  priority: TaskPriority[];
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
};

export const DEFAULT_HABITS_FILTERS: HabitsFiltersState = {
  search: '',
  status: [],
  priority: [],
  sortOrder: 'desc',
  page: 1,
  limit: 5,
};

const FILTERS_STORAGE_KEY = 'lifeos.habits.filters';

export function loadHabitsFilters(): HabitsFiltersState {
  if (typeof window === 'undefined') {
    return DEFAULT_HABITS_FILTERS;
  }

  try {
    const stored = localStorage.getItem(FILTERS_STORAGE_KEY);
    if (!stored) return DEFAULT_HABITS_FILTERS;
    return { ...DEFAULT_HABITS_FILTERS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_HABITS_FILTERS;
  }
}

export function saveHabitsFilters(filters: HabitsFiltersState) {
  if (typeof window === 'undefined') return;
  const { page, ...persisted } = filters;
  localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(persisted));
}

export const HABIT_CATEGORIES = ['Habits', 'Goals', 'Health', 'Mind', 'Skills', 'Finance'] as const;

export type CreateHabitForm = {
  title: string;
  category: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
};
