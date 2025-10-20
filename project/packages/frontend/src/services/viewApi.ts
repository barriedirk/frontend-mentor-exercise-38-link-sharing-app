import { mapUserFromApi } from '@src/shared/mappers/user.mapper';
import { getApiUrl } from '@src/shared/getApiUrl';
import { FullProfile } from '@src/models/FullProfile';
import { mapLinkFromApi } from '@src/shared/mappers/link.mapper';
import { Link } from '@src/models/Link';

export const viewProfile = async (slug: string): Promise<FullProfile> => {
  const res = await fetch(`${getApiUrl()}/view/${encodeURIComponent(slug)}`, {
    method: 'GET',
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error?.error || 'get profile failed');
  }

  const fullProfileRaw = await res.json();

  return {
    user: mapUserFromApi(fullProfileRaw.user),
    links: fullProfileRaw.links.map((link: Link) => mapLinkFromApi(link)),
  };
};
