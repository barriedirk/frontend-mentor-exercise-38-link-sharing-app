import { create } from 'zustand';
import { User } from '@src/models/User';
import { LinkProfile } from './LinkProfile';

export const useProfileStore = create<LinkProfile>((set) => ({
  profile: null,
  avatar: null,
  reset: () => set({ profile: null }),
  updateProfile: (profile) =>
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, ...profile }
        : ({ ...profile } as User),
    })),

  updateAvatar: (avatar) => set({ avatar }),
}));
