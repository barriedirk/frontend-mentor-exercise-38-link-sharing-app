import { create } from 'zustand';

import { Link, Profile, MainStore } from '@src/models/Types';

export const useMainStore = create<MainStore>((set) => ({
  profile: null,
  links: [],
  isPreviewOpen: false,
  setProfile: (profile) => set({ profile }),
  setLinks: (links) => set({ links }),
  addLink: (link) => set((state) => ({ links: [...state.links, link] })),
  removeLink: (id) =>
    set((state) => ({ links: state.links.filter((l) => l.id !== id) })),
  togglePreview: () =>
    set((state) => ({ isPreviewOpen: !state.isPreviewOpen })),
}));
