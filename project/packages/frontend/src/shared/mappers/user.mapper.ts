// mappers/user.mapper.ts
import { User } from '@src/models/User';

export const mapUserFromApi = (apiUser: any): User => ({
  id: apiUser.id,
  email: apiUser.email,
  fullName: apiUser.full_name,
  avatarUrl: apiUser.avatar_url ?? undefined,
});
