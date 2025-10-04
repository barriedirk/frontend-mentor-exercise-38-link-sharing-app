import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

import styles from './MainLayout.module.css';

import { Loading } from '@src/components/loading/Loading';

import Footer from './Footer';

export default function MainLayout() {
  return (
    <>
      <Loading />
      <div className={clsx(styles['ml'])}>
        <main className={clsx(styles['ml__main'])}>
          <Outlet />
        </main>
        <Footer className={clsx(styles['ml__footer'])} />
      </div>
    </>
  );
}
