import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthGuard from '@src/components/auth/AuthGuard';

import AuthLayout from '@src/layout/authLayout/AuthLayout';
import MainLayout from '@src/layout/mainLayout/MainLayout';
import PublicLayout from '@src/layout/publicLayout/PublicLayout';
import { AuthRedirect } from '@src/components/auth/AuthRedirect';

const Login = lazy(() => import('../features/auth/pages/Login'));
const SignUp = lazy(() => import('../features/auth/pages/SignUp'));
const MainLinks = lazy(() => import('../features/links/pages/MainLinks'));
const NotFound = lazy(() => import('../features/notFound/pages/NotFound'));

const PublicLinkPage = lazy(
  () => import('../features/publicLink/pages/PublicLinkPage')
);

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthRedirect />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MainLinks />} />
          </Route>
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/view/:token" element={<PublicLinkPage />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
