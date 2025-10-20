import { PreviewProfile } from '@src/components/previewProfile/PreviewProfile';
import { FullProfile } from '@src/models/FullProfile';
import { getApiUrl } from '@src/shared/getApiUrl';
import { useLinksStore } from '@src/store/useLinksStore';
import { useProfileStore } from '@src/store/useProfileStore';

export default function Preview() {
  const links = useLinksStore((state) => state.links);
  const profile = useProfileStore((state) => state.profile);
  const avatar = useProfileStore((state) => state.avatar);
  const API_URL = `${getApiUrl()}/uploads/`;

  if (!profile || !links) {
    return <p>Please, check profile and links.</p>;
  }

  const fullProfile: FullProfile = window.structuredClone({
    user: profile,
    links: links,
  });

  if (avatar) {
    fullProfile.user.avatarUrl = URL.createObjectURL(avatar);
  } else if (fullProfile.user.avatarUrl) {
    fullProfile.user.avatarUrl = `${API_URL}/${fullProfile.user.avatarUrl}`;
  }

  return (
    <PreviewProfile
      fullProfile={fullProfile}
      showBackToEditor={true}
      showshareLink={true}
    />
  );
}
