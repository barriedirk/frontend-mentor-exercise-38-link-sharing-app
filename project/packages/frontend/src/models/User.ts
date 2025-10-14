export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  slug: string;
  password?: string;
  avatarUrl?: string;
}
