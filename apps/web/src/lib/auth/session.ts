import type { AuthTokens } from '@/types/auth';

const ACCESS_TOKEN_KEY = 'lifeos.accessToken';
const REFRESH_TOKEN_KEY = 'lifeos.refreshToken';

export function saveAuthTokens(tokens: AuthTokens) {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
}

export function clearAuthTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getUserIdFromToken() {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as { sub?: string };
    return payload.sub ?? null;
  } catch {
    return null;
  }
}
