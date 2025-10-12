import { Link } from '@src/models/Types';

export interface LinkState {
  links: Link[];
  isLinksValid: boolean;
  addNewLink: () => void;
  update: (link: Link[]) => void;
  updateLink: (link: Link, idx: number) => void;
  switchPosition: (draggedItemIndex: number, idx: number) => void;
  updateIsLinksValid: (isLinksValid: boolean) => void;
  removeLink: (index: number) => void;
  clearLinks: () => void;
  reset: () => void;
}
