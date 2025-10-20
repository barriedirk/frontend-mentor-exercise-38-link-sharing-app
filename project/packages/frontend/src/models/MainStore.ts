import { Profile } from './Profile';
import { Link } from './Link';

export type MainStore = {
  profile: Profile | null;
  links: Link[];
  isPreviewOpen: boolean;
  setProfile: (profile: Profile) => void;
  setLinks: (links: Link[]) => void;
  addLink: (link: Link) => void;
  removeLink: (id: string) => void;
  togglePreview: () => void;
};
