export const mapProfileFromApi = (profile: any) => ({
  id: profile.id,
  email: profile.email,
  firstName: profile.first_name,
  lastName: profile.last_name,
  slug: profile.slug,
  avatarUrl: profile.avatar_url,
});

export const mapLinkFromApi = (link: any) => ({
  id: link.id,
  platform: link.platform,
  url: link.url,
});

export const mapLinkToApi = (link: { platform: string; url: string }) => ({
  platform: link.platform,
  url: link.url,
});
