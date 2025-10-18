import { mapUserFromApi } from '@src/shared/mappers/user.mapper';
import { getApiUrl } from '@src/shared/getApiUrl';

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await fetch(`${getApiUrl()}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error?.error || 'Login failed');
  }

  const json = await res.json();

  return {
    token: json.token,
    user: mapUserFromApi(json.user),
  };
};

export const signUpUser = async (data: { email: string; password: string }) => {
  const res = await fetch(`${getApiUrl()}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error?.error || 'Login failed');
  }

  const json = await res.json();

  return {
    token: json.token,
    user: mapUserFromApi(json.user),
  };
};
