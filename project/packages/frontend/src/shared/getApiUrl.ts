let cachedApiUrl: string | null = null;

export function getApiUrl(): string | null {
  if (cachedApiUrl) {
    return cachedApiUrl;
  }

  const url = import.meta.env.VITE_API_URL;

  try {
    if (!url) throw new Error();
    new URL(url);
    cachedApiUrl = url;

    return cachedApiUrl;
  } catch {
    throw new Error(`Invalid or missing VITE_API_URL: "${url}"`);
  }
}
