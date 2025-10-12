export type Link = {
  id?: number;
  platform: string;
  url: string;
};

export type Profile = {
  name: string;
  avatarUrl: string;
};

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
