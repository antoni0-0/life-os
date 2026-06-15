'use client';

import { createTask, getTasks } from '@/lib/api/tasks';
import { getUserIdFromToken } from '@/lib/auth/session';
import { ApiError } from '@/lib/api/client';
import {
  DEFAULT_HABITS_FILTERS,
  loadHabitsFilters,
  saveHabitsFilters,
  type CreateHabitForm,
  type HabitsFiltersState,
} from '@/lib/habits/habits-data';
import type { Task, TasksListResponse } from '@/types/tasks';
import { useCallback, useEffect, useMemo, useState } from 'react';

const EMPTY_RESPONSE: TasksListResponse = {
  data: [],
  meta: { total: 0, page: 1, limit: 5, totalPages: 1 },
};

export function useHabits() {
  const [filters, setFilters] = useState<HabitsFiltersState>(DEFAULT_HABITS_FILTERS);
  const [response, setResponse] = useState<TasksListResponse>(EMPTY_RESPONSE);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFilters(loadHabitsFilters());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveHabitsFilters(filters);
  }, [filters, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    let cancelled = false;

    const loadTasks = async () => {
      setLoading(true);
      setLoadError(null);

      const userId = getUserIdFromToken();
      if (!userId) {
        if (cancelled) return;
        setResponse(EMPTY_RESPONSE);
        setAllTasks([]);
        setLoadError('Sign in to view and manage your habits.');
        setLoading(false);
        return;
      }

      try {
        const query = {
          search: filters.search || undefined,
          status: filters.status.length ? filters.status : undefined,
          priority: filters.priority.length ? filters.priority : undefined,
          sortBy: 'createdAt' as const,
          sortOrder: filters.sortOrder,
          page: filters.page,
          limit: filters.limit,
          userId,
        };

        const [apiResponse, allResponse] = await Promise.all([
          getTasks(query),
          getTasks({ userId, sortBy: 'createdAt', sortOrder: 'desc', page: 1, limit: 100 }),
        ]);

        if (cancelled) return;

        setResponse(apiResponse);
        setAllTasks(allResponse.data);
      } catch (err) {
        if (cancelled) return;
        setResponse(EMPTY_RESPONSE);
        setAllTasks([]);
        setLoadError(
          err instanceof ApiError ? err.message : 'Unable to load habits. Please try again.',
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const timeout = setTimeout(loadTasks, filters.search ? 300 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [hydrated, filters]);

  const selectedTask = useMemo(
    () =>
      allTasks.find((task) => task.id === selectedTaskId) ??
      response.data.find((task) => task.id === selectedTaskId) ??
      null,
    [allTasks, response.data, selectedTaskId],
  );

  const updateFilters = useCallback((patch: Partial<HabitsFiltersState>) => {
    setFilters((current) => ({ ...current, ...patch, page: patch.page ?? 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ ...DEFAULT_HABITS_FILTERS });
  }, []);

  const toggleFilterValue = useCallback(
    <T extends string>(key: 'status' | 'priority', value: T) => {
      setFilters((current) => {
        const list = current[key] as T[];
        const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
        return { ...current, [key]: next, page: 1 };
      });
    },
    [],
  );

  const createHabit = useCallback(async (form: CreateHabitForm) => {
    setCreating(true);
    setCreateError(null);

    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        setCreateError('Sign in to create habits.');
        return;
      }

      const created = await createTask({
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim() || undefined,
        priority: form.priority,
        status: form.status,
        userId,
      });

      setSelectedTaskId(created.id);
      setIsCreateOpen(false);
      setFilters((current) => ({ ...current, page: 1 }));
    } catch (err) {
      setCreateError(err instanceof ApiError ? err.message : 'Unable to create habit. Please try again.');
    } finally {
      setCreating(false);
    }
  }, []);

  return {
    filters,
    tasks: response.data,
    meta: response.meta,
    allTasks,
    loading,
    loadError,
    creating,
    createError,
    isCreateOpen,
    setIsCreateOpen,
    createHabit,
    setCreateError,
    selectedTask,
    selectedTaskId,
    setSelectedTaskId,
    updateFilters,
    clearFilters,
    toggleFilterValue,
    openCreateModal: () => {
      setCreateError(null);
      setIsCreateOpen(true);
    },
  };
}
