import styles from './MainLinks.module.css';

import { useEffect } from 'react';

import { useSignals } from '@preact/signals-react/runtime';

import { tabHeader } from './MainLinksStateSignal';

import Header from './header/Header';
import Mockup from './mockup/Mockup';
import Profile from './profile/Profile';
import Links from './links/Links';

import clsx from 'clsx';

export default function MainLinks() {
  useSignals();

  useEffect(() => {
    tabHeader.value = 'profile';
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
            {tabHeader.value === 'profile' && <Profile />}
            {tabHeader.value === 'link' && <Links />}
          </div>
        </div>
      </div>
    </div>
  );
}
