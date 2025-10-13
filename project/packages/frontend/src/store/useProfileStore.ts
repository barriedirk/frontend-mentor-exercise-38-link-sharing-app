import { create } from 'zustand';

import { LinkProfile } from './LinkProfile';
import { User } from '@src/models/User';

export const useProfileStore = create<LinkProfile>((set) => ({
  profile: null,
  update: (profile: User | null) => set({ profile }),
}));
