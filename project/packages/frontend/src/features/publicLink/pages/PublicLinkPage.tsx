import { useSignal } from '@preact/signals-react';
import { PreviewProfile } from '@src/components/previewProfile/PreviewProfile';
import { FullProfile } from '@src/models/FullProfile';
import { loadingSignal } from '@src/services/loadingSignal';
import { viewProfile } from '@src/services/viewApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import toast from 'react-hot-toast';

export default function PublicLinkPage() {
  useSignal();

  const { slug } = useParams<{ slug: string }>();

  const [fullProfile, setFullProfile] = useState<FullProfile | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!slug) {
      setError(new Error('Missing slug'));

      return;
    }

    async function fetchProfile(slug: string) {
      loadingSignal.show();
      const idToast = toast.loading('Loading');

      try {
        const profile = await viewProfile(slug);

        profile.user.avatarUrl = profile.user.avatarUrl
          ? `${profile.user.avatarUrl}`
          : undefined;

        setFullProfile(profile);
      } catch (err) {
        console.error('Failed to fetch profile', err);
        toast.error('Failed to fetch profile', { id: idToast });

        setError(err as Error);
      } finally {
        loadingSignal.hide();
        setHasLoaded(true);
      }
    }

    fetchProfile(slug);
  }, [slug]);

  if (!slug) return <p>Missing slug...</p>;
  if (!hasLoaded) return <p>Loading...</p>;
  if (error) return <div>Error loading data: {error.message}</div>;
  if (!fullProfile) return <p>No profile data found.</p>;

  return (
    <PreviewProfile
      fullProfile={fullProfile}
      showBackToEditor={false}
      showshareLink={true}
      showLogo={true}
    />
  );
}
