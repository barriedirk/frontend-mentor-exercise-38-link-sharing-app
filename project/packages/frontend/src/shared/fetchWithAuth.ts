import { useAuthStore } from '@src/store/useAuthStore';

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const { token, logout } = useAuthStore.getState();

  const headers: HeadersInit = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401 || res.status === 403) {
    logout();

    throw new Error('Unauthorized');
  }

  return res;
};
