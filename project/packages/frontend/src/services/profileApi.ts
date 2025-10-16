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

export const updateProfile = async (
  profile: User,
  pictureFile?: File
): Promise<void> => {
  const formData = new FormData();

  formData.append('email', profile.email);
  formData.append('firstName', profile.firstName);
  formData.append('lastName', profile.lastName);
  formData.append('slug', profile.slug);
  if (profile.id !== undefined) formData.append('id', String(profile.id));
  if (profile.password) formData.append('password', profile.password);
  if (profile.avatarUrl) formData.append('avatar_url', profile.avatarUrl);

  if (pictureFile) {
    formData.append('avatar', pictureFile);
  }

  const res = await fetchWithAuth(`${API_URL}/update`, {
    method: 'put',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error?.error || 'Failed to update profile');
  }

  const json = await res.json();

  return;
};
