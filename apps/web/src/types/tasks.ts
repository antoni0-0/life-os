export const TASK_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;
export const TASK_STATUSES = [
  'PENDING',
  'IN_PROGRESS',
  'REVIEW',
  'COMPLETED',
  'CANCELLED',
] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];

export type TaskAssignee = {
  id: string;
  firstName: string;
  lastName: string | null;
  preferredName: string | null;
  profilePicture: string | null;
};

export type Task = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: TaskAssignee;
};

export type CreateTaskPayload = {
  title: string;
  category: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
  userId: string;
};

export type QueryTasksParams = {
  search?: string;
  status?: TaskStatus[];
  priority?: TaskPriority[];
  sortBy?: 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  userId?: string;
};

export type TasksListResponse = {
  data: Task[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const TASK_FILTER_CONFIG = {
  status: {
    label: 'Status',
    options: [
      { value: 'PENDING', label: 'Pending' },
      { value: 'IN_PROGRESS', label: 'In progress' },
      { value: 'REVIEW', label: 'In review' },
      { value: 'COMPLETED', label: 'Completed' },
      { value: 'CANCELLED', label: 'Cancelled' },
    ],
  },
  priority: {
    label: 'Priority',
    options: [
      { value: 'LOW', label: 'Low' },
      { value: 'MEDIUM', label: 'Medium' },
      { value: 'HIGH', label: 'High' },
      { value: 'URGENT', label: 'Urgent' },
    ],
  },
} as const;
