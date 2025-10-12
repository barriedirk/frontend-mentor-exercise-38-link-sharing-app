import { create } from 'zustand';
import { Link } from '@src/models/Types';
import { LinkState } from './LinkState';

export const useLinksStore = create<LinkState>((set) => ({
  links: [],
  isLinksValid: false,
  addNewLink: () =>
    set((state) => ({
      links: [...state.links, { url: '', platform: '' }],
    })),
  update: (links: Link[]) => set({ links }),
  updateLink: (link: Link, idx: number) => {
    set((state) => {
      const current = state.links[idx];

      if (current.url === link.url && current.platform === link.platform) {
        return {};
      }

      const updatedLinks = [...state.links];

      updatedLinks[idx] = link;

      return { links: updatedLinks };
    });
  },
  updateIsLinksValid: (isLinksValid: boolean) => set({ isLinksValid }),
  switchPosition: (draggedItemIndex: number, idx: number) => {
    set((state) => {
      if (idx < 0 || idx >= state.links.length) return {};

      const updatedLinks = window.structuredClone(state.links);
      const [draggedItem] = updatedLinks.splice(draggedItemIndex, 1);

      updatedLinks.splice(idx, 0, draggedItem);

      return { links: updatedLinks };
    });
  },
  removeLink: (index) =>
    set((state) => {
      const newLinks = [...state.links];

      newLinks.splice(index, 1);

      return { links: newLinks };
    }),
  clearLinks: () => set({ links: [] }),
  reset: () =>
    set({
      links: [],
      isLinksValid: false,
    }),
}));
