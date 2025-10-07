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

// import { useMainStore } from '@src/store/useMainStore';

// function ProfileSection() {
//   const profile = useMainStore((state) => state.profile);
//   const setProfile = useMainStore((state) => state.setProfile);

//   return (
//     <div>
//       <p>{profile?.name ?? 'No profile set'}</p>
//       <button
//         onClick={() =>
//           setProfile({ name: 'Jane Doe', avatarUrl: '/avatar.jpg' })
//         }
//       >
//         Set Profile
//       </button>
//     </div>
//   );
// }

// function LinksEditor() {
//   const links = useMainStore((state) => state.links);
//   const addLink = useMainStore((state) => state.addLink);

//   return (
//     <div>
//       {links.map((link) => (
//         <div key={link.id}>{link.title}</div>
//       ))}
//       <button
//         onClick={() =>
//           addLink({ id: '123', title: 'GitHub', url: 'https://github.com' })
//         }
//       >
//         Add Link
//       </button>
//     </div>
//   );
// }

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export const useMainStore = create<MainStore>()(
//   persist(
//     (set) => ({
//       // your state
//     }),
//     {
//       name: 'main-store',
//     }
//   )
// );
