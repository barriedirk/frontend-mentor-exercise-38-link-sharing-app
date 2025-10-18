import { getApiUrl } from '@src/shared/getApiUrl';

import { User } from '@src/models/User';
import { fetchWithAuth } from '@src/shared/fetchWithAuth';
import { mapProfileFromApi } from '@src/shared/mappers/link.mapper';

export const getProfile = async (id: number): Promise<User> => {
  const res = await fetchWithAuth(`${getApiUrl()}/get`, {
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
  pictureFile?: File | null
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

  const res = await fetchWithAuth(`${getApiUrl()}/update`, {
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
