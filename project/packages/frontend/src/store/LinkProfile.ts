import { User } from '@src/models/User';

export interface LinkProfile {
  profile?: User | null;
  updateProfile: (profile: User | null) => void;
  updateAvatar: (profile: User | null) => void;
}
