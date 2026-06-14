import { apiRequest } from '@/lib/api/client';
import type { AuthTokens, LoginPayload, RegisterPayload } from '@/types/auth';

export function login(payload: LoginPayload) {
  return apiRequest<AuthTokens>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function register(payload: RegisterPayload) {
  return apiRequest<AuthTokens>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
