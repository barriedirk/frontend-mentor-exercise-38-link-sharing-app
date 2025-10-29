import { getApiUrl } from '@src/shared/getApiUrl';

export const testApi = async () => {
  const res = await fetch(`${getApiUrl()}/test`, {
    method: 'GET',
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error?.error || 'Api failed');
  }

  const message = await res.text();

  return {
    message,
  };
};
