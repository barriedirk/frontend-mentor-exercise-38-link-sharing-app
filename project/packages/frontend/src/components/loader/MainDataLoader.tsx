import { loadingSignal } from '@src/services/loadingSignal';

import { useEffect, useState } from 'react';

import { getLinks } from '@src/services/linksApi';
import { getProfile } from '@src/services/profileApi';

import { useLinksStore } from '@src/store/useLinksStore';
import { useAuthStore } from '@src/store/useAuthStore';
import { useProfileStore } from '@src/store/useProfileStore';
import toast from 'react-hot-toast';

import { redirect } from 'react-router-dom';
import { useSignals } from '@preact/signals-react/runtime';

interface MainDataLoaderProps {
  children: React.ReactNode;
}

export function MainDataLoader({ children }: MainDataLoaderProps) {
  useSignals();

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const user = useAuthStore((state) => state.user);
  const updateLinks = useLinksStore((state) => state.update);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const resetProfile = useProfileStore((state) => state.reset);

  useEffect(() => {
    if (!user) return;

    loadingSignal.show();

    const idToast = toast.loading('Loading');

    setIsLoaded(false);
    updateLinks([]);
    resetProfile();

    async function fetchLinks() {
      try {
        const [fetchedLinks, fetchedProfile] = await Promise.all([
          getLinks(),
          getProfile(user?.id ?? 0),
        ]);
        updateLinks(fetchedLinks);
        updateProfile(fetchedProfile);

        toast.success('Profile was loaded', { id: idToast });
      } catch (error) {
        console.error('Failed to fetch links', error);
        toast.error('Failed to fetch profile', { id: idToast });

        setError(error as Error);

        redirect('/login');
      } finally {
        loadingSignal.hide();

        setIsLoaded(true);
      }
    }

    fetchLinks();
  }, [user, updateLinks, updateProfile, resetProfile]);

  if (!isLoaded) return <p>Loading...</p>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return <>{children}</>;
}
