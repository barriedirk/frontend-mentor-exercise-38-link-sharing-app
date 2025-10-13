import { User } from '@src/models/User';

export const mapUserFromApi = (apiUser: any): User => ({
  id: apiUser.id,
  email: apiUser.email,
  firstName: apiUser.first_name,
  lastName: apiUser.last_name,
  slug: apiUser.slug,
  avatarUrl: apiUser.avatar_url ?? undefined,
});
