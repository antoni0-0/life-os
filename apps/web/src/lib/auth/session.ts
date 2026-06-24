import type { AuthTokens } from '@/types/auth';

const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY ?? '';
const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY ?? '';

type JwtPayload = {
  sub?: string;
  exp?: number;
};

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    return JSON.parse(atob(token.split('.')[1])) as JwtPayload;
  } catch {
    return null;
  }
}

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

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function isTokenExpired(token: string | null, bufferSeconds = 30) {
  if (!token) return true;

  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;

  return payload.exp * 1000 <= Date.now() + bufferSeconds * 1000;
}

export function hasValidAccessToken() {
  const token = getAccessToken();
  return !!token && !isTokenExpired(token);
}

export function hasValidRefreshToken() {
  const token = getRefreshToken();
  return !!token && !isTokenExpired(token);
}

export function hasActiveSession() {
  return hasValidAccessToken() || hasValidRefreshToken();
}

export function initializeSession() {
  if (hasActiveSession()) {
    return true;
  }
  clearAuthTokens();
  return false;
}

export function getUserIdFromToken() {
  const token = getAccessToken();
  if (!token) return null;

  const payload = decodeJwtPayload(token);
  return payload?.sub ?? null;
}
