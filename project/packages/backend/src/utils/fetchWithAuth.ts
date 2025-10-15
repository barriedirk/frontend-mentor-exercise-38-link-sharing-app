import { useAuthStore } from '@src/store/useAuthStore';
import toast from 'react-hot-toast';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    // Auto-logout
    useAuthStore.getState().logout();
    toast.error('Session expired. Please log in again.');
    // Optional: redirect to login
    window.location.href = '/#/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || 'Something went wrong');
  }

  return res.json();
}
