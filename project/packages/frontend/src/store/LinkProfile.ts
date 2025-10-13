import { User } from '@src/models/User';

export interface LinkProfile {
  profile?: User | null;
  update: (profile: User | null) => void;
}
