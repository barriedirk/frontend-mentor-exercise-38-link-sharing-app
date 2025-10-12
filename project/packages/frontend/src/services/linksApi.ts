import { Link } from '@src/models/Types';
import { fetchWithAuth } from '@src/shared/fetchWithAuth';
import { mapLinkFromApi, mapLinkToApi } from '@src/shared/mappers/link.mapper';

const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:1234/api/devlinks';

export const getLinks = async () => {
  const res = await fetchWithAuth(`${API_URL}/links`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error?.error || 'Failed to fetch links');
  }

  const json = await res.json();

  return json.links.map((link: Link) => mapLinkFromApi(link));
};

export const updateLinks = async (
  links: Array<{ platform: string; url: string }>
) => {
  const res = await fetchWithAuth(`${API_URL}/links`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(links.map((link) => mapLinkToApi(link))),
  });

  if (!res.ok) {
    let errorText = 'Unknown error';

    try {
      const error = await res.json();

      errorText = error?.error || 'Failed to update links';
    } catch (e) {
      console.error('Failed to parse error response:', e);
    }

    throw new Error(errorText);
  }

  const text = await res.text();

  if (!text) {
    return;
  }

  try {
    const json = JSON.parse(text);

    return json.links.map((link: Link) => mapLinkFromApi(link));
  } catch (e) {
    console.error('Failed to parse successful response:');

    throw e;
  }
};
