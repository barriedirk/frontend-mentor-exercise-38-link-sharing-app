import { create } from 'zustand';
import { User } from '@src/models/User';

interface LinkProfile {
  profile: User | null;
  updateProfile: (profile: Partial<User>) => void;
  updateAvatar: (avatarUrl: string) => void;
  reset: () => void;
}

export const useProfileStore = create<LinkProfile>((set) => ({
  profile: null,

  reset: () => set({ profile: null }),
  updateProfile: (profile) =>
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, ...profile }
        : ({ ...profile } as User),
    })),

  updateAvatar: (avatarUrl) =>
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, avatarUrl }
        : ({ avatarUrl } as User),
    })),
}));
