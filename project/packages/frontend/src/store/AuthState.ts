import { User } from '@src/models/User';

export interface AuthState {
  user: User | null;
  token: string | null;
  shouldRedirect: boolean | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  resetRedirect: () => void;
}
