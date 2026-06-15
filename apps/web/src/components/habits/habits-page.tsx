'use client';

import { CreateHabitModal } from '@/components/habits/create-habit-modal';
import { HabitsActiveFilters } from '@/components/habits/habits-active-filters';
import { HabitsDetail } from '@/components/habits/habits-detail';
import { HabitsHeader } from '@/components/habits/habits-header';
import { HabitsPagination } from '@/components/habits/habits-pagination';
import { HabitsStats } from '@/components/habits/habits-stats';
import { HabitsTable } from '@/components/habits/habits-table';
import { HabitsTaskCards } from '@/components/habits/habits-task-cards';
import { HabitsToolbar } from '@/components/habits/habits-toolbar';
import { useHabits } from '@/hooks/use-habits';

export function HabitsPage() {
  const {
    filters,
    tasks,
    meta,
    allTasks,
    loading,
    loadError,
    creating,
    createError,
    isCreateOpen,
    setIsCreateOpen,
    createHabit,
    openCreateModal,
    setCreateError,
    selectedTask,
    selectedTaskId,
    setSelectedTaskId,
    updateFilters,
    clearFilters,
    toggleFilterValue,
  } = useHabits();

  const hasActiveFilters =
    filters.search.length > 0 || filters.status.length > 0 || filters.priority.length > 0;

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <div className="flex min-w-0 flex-1 flex-col gap-5 px-4 py-6 pt-20 sm:px-6 lg:px-8 lg:pt-8">
        <HabitsHeader onCreateClick={openCreateModal} />
        <HabitsStats tasks={allTasks} />
        <HabitsToolbar
          filters={filters}
          onSearchChange={(search) => updateFilters({ search })}
          onStatusToggle={(status) => toggleFilterValue('status', status)}
          onPriorityToggle={(priority) => toggleFilterValue('priority', priority)}
          onSortChange={(sortOrder) => updateFilters({ sortOrder })}
        />
        <HabitsActiveFilters
          filters={filters}
          onRemoveStatus={(status) => toggleFilterValue('status', status)}
          onClearPriority={() => updateFilters({ priority: [] })}
          onClear={clearFilters}
        />

        {loading ? (
          <div className="flex flex-1 items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : loadError ? (
          <div className="rounded-xl border border-white/5 bg-surface/60 py-16 text-center">
            <p className="text-text-secondary">{loadError}</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-surface/60 py-16 text-center">
            <p className="text-text-secondary">
              {hasActiveFilters
                ? 'No habits match your current filters.'
                : 'No habits yet. Create your first one to get started.'}
            </p>
            {!hasActiveFilters && (
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-4 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-medium"
              >
                Create your first habit
              </button>
            )}
          </div>
        ) : (
          <>
            <HabitsTable
              tasks={tasks}
              selectedTaskId={selectedTaskId}
              onSelect={setSelectedTaskId}
            />
            <HabitsTaskCards
              tasks={tasks}
              selectedTaskId={selectedTaskId}
              onSelect={setSelectedTaskId}
            />
            <HabitsPagination
              page={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
              limit={meta.limit}
              onPageChange={(page) => updateFilters({ page })}
            />
          </>
        )}
      </div>

      <HabitsDetail
        task={selectedTask}
        onClose={() => setSelectedTaskId(null)}
        variant="panel"
      />

      <HabitsDetail
        task={selectedTask}
        onClose={() => setSelectedTaskId(null)}
        variant="sheet"
      />

      <CreateHabitModal
        isOpen={isCreateOpen}
        isSubmitting={creating}
        error={createError}
        onClose={() => {
          setCreateError(null);
          setIsCreateOpen(false);
        }}
        onSubmit={createHabit}
      />
    </div>
  );
}
