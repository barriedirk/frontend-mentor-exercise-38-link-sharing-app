import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

import styles from './PublicLayout.module.css';

// import { Loading } from "@/components/loading/Loading";

export default function PublicLayout() {
  return (
    <>
      {/* <Loading /> */}
      <div className={clsx(styles['pl'])}>
        <main className={clsx(styles['ml__main'])}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
