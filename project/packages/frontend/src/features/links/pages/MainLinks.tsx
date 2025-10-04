import Header from './header/Header';
import Preview from './preview/Preview';
import Profile from './profile/Profile';
import Links from './links/Links';

import clsx from 'clsx';
import styles from './MainLinks.module.css';

export default function MainLinks() {
  return (
    <div className={clsx(styles['links'], 'md:p-5')}>
      <Header />
      <div className={clsx(styles['links__main'], 'mt-2.5')}>
        <aside className={clsx(styles['links__pre-view'])}>
          <Preview />
        </aside>
        <div className={clsx(styles['links__editor'])}>
          <div className={clsx(styles['links__editor-wrapper'])}>
            {/* <Profile /> */}
            <Links />
          </div>
        </div>
      </div>
    </div>
  );
}
