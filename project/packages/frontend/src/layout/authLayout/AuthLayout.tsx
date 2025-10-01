import './AuthLayout.css';

import { Outlet } from 'react-router-dom';

import { Loading } from '@src/components/loading/Loading';

import Header from './Header';
import Footer from './Footer';

export default function AuthLayout() {
  return (
    <>
      <Loading />
      <div className="auth-wrapper">
        <Header />
        <main className="auth-layout">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
