import { loadingSignal } from '@src/services/loadingSignal';

import { useEffect, useState } from 'react';

import { getLinks } from '@src/services/linksApi';

import { useSignals } from '@preact/signals-react/runtime';

import { tabHeader } from './MainLinksStateSignal';

import Header from './header/Header';
import Preview from './preview/Preview';
import Profile from './profile/Profile';
import Links from './links/Links';

import clsx from 'clsx';
import styles from './MainLinks.module.css';

import { useLinksStore } from '@src/store/useLinksStore';

export default function MainLinks() {
  useSignals();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const updateLinks = useLinksStore((state) => state.update);

  useEffect(() => {
    tabHeader.value = 'link';
  }, []);

  useEffect(() => {
    loadingSignal.show();
    setIsLoaded(false);
    updateLinks([]);

    const fetchLinks = async () => {
      try {
        const fetchedLinks = await getLinks();

        console.log('@todo MainLinks', fetchedLinks);

        updateLinks(fetchedLinks);

        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to fetch links', error);
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
          <Preview />
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
