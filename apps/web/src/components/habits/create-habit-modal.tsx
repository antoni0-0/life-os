'use client';

import { TASK_FILTER_CONFIG } from '@/types/tasks';
import type { CreateHabitForm } from '@/lib/habits/habits-data';
import { HABIT_CATEGORIES } from '@/lib/habits/habits-data';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderCircle, X } from 'lucide-react';
import { FormEvent, useState } from 'react';

const DEFAULT_FORM: CreateHabitForm = {
  title: '',
  category: 'Habits',
  description: '',
  priority: 'MEDIUM',
  status: 'PENDING',
};

type CreateHabitModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (form: CreateHabitForm) => Promise<void>;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-text-primary">{children}</label>;
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-elevated px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/20';

export function CreateHabitModal({ isOpen, isSubmitting, error, onClose, onSubmit }: CreateHabitModalProps) {
  const [form, setForm] = useState<CreateHabitForm>(DEFAULT_FORM);

  function handleClose() {
    if (isSubmitting) return;
    setForm(DEFAULT_FORM);
    onClose();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await onSubmit(form);
    setForm(DEFAULT_FORM);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-surface p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">New habit</h2>
                <p className="text-sm text-text-secondary">Add a habit to your daily routine</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-1 text-text-secondary transition hover:bg-white/5 hover:text-text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <FieldLabel>Title</FieldLabel>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))}
                  placeholder="e.g. Morning exercise"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <FieldLabel>Category</FieldLabel>
                <select
                  value={form.category}
                  onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}
                  className={inputClass}
                >
                  {HABIT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <FieldLabel>Description</FieldLabel>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
                  placeholder="What does this habit involve?"
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <FieldLabel>Priority</FieldLabel>
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm((current) => ({
                        ...current,
                        priority: e.target.value as CreateHabitForm['priority'],
                      }))
                    }
                    className={inputClass}
                  >
                    {TASK_FILTER_CONFIG.priority.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <FieldLabel>Status</FieldLabel>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm((current) => ({
                        ...current,
                        status: e.target.value as CreateHabitForm['status'],
                      }))
                    }
                    className={inputClass}
                  >
                    {TASK_FILTER_CONFIG.status.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && <p className="text-sm text-danger">{error}</p>}

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl border border-white/10 py-3 text-sm text-text-secondary transition hover:text-text-primary disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !form.title.trim()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary py-3 text-sm font-medium transition hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                  Create habit
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
