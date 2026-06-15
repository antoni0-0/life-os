'use client';

import type { Task } from '@/types/tasks';
import {
  getCategoryStyle,
  getStatusLabel,
  getStatusStyles,
  getTaskDetailMeta,
} from '@/lib/habits/task-display';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Pencil, X } from 'lucide-react';

type HabitsDetailProps = {
  task: Task | null;
  onClose: () => void;
  variant: 'panel' | 'sheet';
};

function DetailContent({ task, onClose, variant }: { task: Task; onClose: () => void; variant: 'panel' | 'sheet' }) {
  const category = getCategoryStyle(task.category);
  const statusStyle = getStatusStyles(task.status);
  const meta = getTaskDetailMeta(task);

  return (
    <>
      {variant === 'sheet' && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium">Habit details</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1 hover:bg-white/5">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex items-start gap-3">
        <img
          src={category.icon}
          alt=""
          className="h-12 w-12 rounded-xl"
          style={{ backgroundColor: `${category.color}30`, boxShadow: `0 0 20px ${category.color}60` }}
        />
        <div>
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${statusStyle.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
            {getStatusLabel(task.status)}
          </span>
          <h2 className="mt-2 text-lg font-semibold">{task.title}</h2>
          <p className="text-sm text-text-secondary">{task.description}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {task.description}. Stay consistent to build a lasting habit and improve your overall well-being.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/5 bg-elevated/50 p-3">
          <p className="text-xs text-text-secondary">Current streak</p>
          <p className="text-xl font-semibold">{meta.currentStreak} days</p>
          <p className="text-xs text-text-secondary">Best: {meta.bestStreak} days</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-elevated/50 p-3">
          <p className="text-xs text-text-secondary">Frequency</p>
          <p className="text-xl font-semibold">{meta.frequency}</p>
          <p className="text-xs text-text-secondary">Every day</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-text-secondary">Recent history</p>
        <div className="flex justify-between gap-1">
          {meta.weekDays.map((day, index) => (
            <div key={`${day}-${index}`} className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  meta.completedDays[index]
                    ? 'border-success/40 bg-success/15 text-success'
                    : 'border-white/10 bg-elevated text-text-secondary'
                }`}
              >
                {meta.completedDays[index] ? <Check className="h-3.5 w-3.5" /> : null}
              </div>
              <span className="text-[10px] text-text-secondary">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-3 text-sm font-medium transition hover:opacity-90"
        >
          Mark as completed
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-text-secondary transition hover:border-white/20 hover:text-text-primary"
        >
          <Pencil className="h-4 w-4" />
          Edit habit
        </button>
      </div>
    </>
  );
}

export function HabitsDetail({ task, onClose, variant }: HabitsDetailProps) {
  if (variant === 'panel') {
    if (!task) {
      return (
        <aside className="hidden w-80 shrink-0 border-l border-white/5 bg-surface/40 p-6 lg:flex lg:items-center lg:justify-center">
          <p className="text-center text-sm text-text-secondary">Select a habit to view its details</p>
        </aside>
      );
    }

    return (
      <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-white/5 bg-surface/40 p-6 lg:block">
        <DetailContent task={task} onClose={onClose} variant="panel" />
      </aside>
    );
  }

  return (
    <AnimatePresence>
      {task && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed right-0 bottom-0 left-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-surface p-5 pb-28 lg:hidden"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
            <DetailContent task={task} onClose={onClose} variant="sheet" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
