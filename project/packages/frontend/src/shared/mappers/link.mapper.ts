export const mapLinkFromApi = (link: any) => ({
  id: link.id,
  platform: link.platform,
  url: link.url,
});

export const mapLinkToApi = (link: { platform: string; url: string }) => ({
  platform: link.platform,
  url: link.url,
});
