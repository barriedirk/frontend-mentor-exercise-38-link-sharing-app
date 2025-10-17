import { User } from '@src/models/User';

export interface LinkProfile {
  profile?: User | null;
  avatar?: File | null;
  reset: () => void;
  updateProfile: (profile: User | null) => void;
  updateAvatar: (avatar: File | null) => void;
}
