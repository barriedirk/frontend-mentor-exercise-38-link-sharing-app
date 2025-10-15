import { User } from '@src/models/User';
import { fetchWithAuth } from '@src/shared/fetchWithAuth';
import { mapProfileFromApi } from '@src/shared/mappers/link.mapper';

const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:1234/api/devlinks';

export const getProfile = async (id: number): Promise<User> => {
  const res = await fetchWithAuth(`${API_URL}/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error?.error || 'Failed to fetch links');
  }

  const json = await res.json();

  return mapProfileFromApi(json.user);
};

export const updateProfile = async (profile: User): Promise<void> => {
  const res = await fetchWithAuth(`${API_URL}/update`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ profile }),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error?.error || 'Failed to update profile');
  }

  const json = await res.json();

  return;
};
