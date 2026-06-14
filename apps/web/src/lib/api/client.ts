import type { ApiErrorBody } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function getApiErrorMessage(body: ApiErrorBody, fallback: string) {
  if (!body.message) {
    return fallback;
  }

  return Array.isArray(body.message) ? body.message.join('. ') : body.message;
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  const body = (await response.json().catch(() => ({}))) as T & ApiErrorBody;

  if (!response.ok) {
    throw new ApiError(
      getApiErrorMessage(body, 'Something went wrong. Please try again.'),
      response.status,
    );
  }

  return body;
}
