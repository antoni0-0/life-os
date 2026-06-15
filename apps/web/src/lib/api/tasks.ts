import { getAccessToken } from '@/lib/auth/session';
import { apiRequest } from '@/lib/api/client';
import type {
  CreateTaskPayload,
  QueryTasksParams,
  Task,
  TasksListResponse,
} from '@/types/tasks';

function buildAuthHeaders(): HeadersInit {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return {};
  }

  return { Authorization: `Bearer ${accessToken}` };
}

function buildQueryString(params: QueryTasksParams) {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set('search', params.search);
  }

  if (params.status?.length) {
    searchParams.set('status', params.status.join(','));
  }

  if (params.priority?.length) {
    searchParams.set('priority', params.priority.join(','));
  }

  if (params.sortBy) {
    searchParams.set('sortBy', params.sortBy);
  }

  if (params.sortOrder) {
    searchParams.set('sortOrder', params.sortOrder);
  }

  if (params.page) {
    searchParams.set('page', String(params.page));
  }

  if (params.limit) {
    searchParams.set('limit', String(params.limit));
  }

  if (params.userId) {
    searchParams.set('userId', params.userId);
  }

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export function createTask(payload: CreateTaskPayload) {
  return apiRequest<Task>('/tasks', {
    method: 'POST',
    headers: buildAuthHeaders(),
    body: JSON.stringify(payload),
  });
}

export function getTasks(params: QueryTasksParams = {}) {
  return apiRequest<TasksListResponse>(`/tasks${buildQueryString(params)}`, {
    headers: buildAuthHeaders(),
  });
}
