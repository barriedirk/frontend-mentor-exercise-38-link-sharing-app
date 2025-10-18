import { loadingSignal } from '@src/services/loadingSignal';

import { useEffect, useState } from 'react';

import { getLinks } from '@src/services/linksApi';
import { getProfile } from '@src/services/profileApi';

import { useSignals } from '@preact/signals-react/runtime';

import { tabHeader } from './MainLinksStateSignal';

import Header from './header/Header';
import Mockup from './mockup/Mockup';
import Profile from './profile/Profile';
import Links from './links/Links';

import clsx from 'clsx';
import styles from './MainLinks.module.css';

import { useLinksStore } from '@src/store/useLinksStore';
import { useAuthStore } from '@src/store/useAuthStore';
import { useProfileStore } from '@src/store/useProfileStore';
import toast from 'react-hot-toast';

export default function MainLinks() {
  useSignals();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const user = useAuthStore((state) => state.user);
  const updateLinks = useLinksStore((state) => state.update);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const resetProfile = useProfileStore((state) => state.reset);

  useEffect(() => {
    tabHeader.value = 'profile';
  }, []);

  useEffect(() => {
    loadingSignal.show();
    const idToast = toast.loading('Loading');

    setIsLoaded(false);
    updateLinks([]);
    resetProfile();

    const fetchLinks = async () => {
      try {
        const [fetchedLinks, fetchedProfile] = await Promise.all([
          getLinks(),
          getProfile(user?.id ?? 0),
        ]);

        updateLinks(fetchedLinks);
        updateProfile(fetchedProfile);

        setIsLoaded(true);
        toast.success('Profile was loaded', { id: idToast });
      } catch (error) {
        console.error('Failed to fetch links', error);

        toast.error('Failed to fetch profile', { id: idToast });
      } finally {
        loadingSignal.hide();
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className={clsx(styles['links'], 'md:p-5')}>
      <Header />
      <div className={clsx(styles['links__main'], 'mt-5')}>
        <aside className={clsx(styles['links__phone-preview'])}>
          <Mockup />
        </aside>

        <div className={clsx(styles['links__editor-wrapper'])}>
          <div className={clsx(styles['links__editor'])}>
            {!isLoaded && <p>Loading....</p>}

            {isLoaded && tabHeader.value === 'profile' && <Profile />}
            {isLoaded && tabHeader.value === 'link' && <Links />}
          </div>
        </div>
      </div>
    </div>
  );
}
