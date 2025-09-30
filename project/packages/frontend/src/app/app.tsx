import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthGuard from '@src/components/auth/AuthGuard';
import AuthLayout from '@src/layout/authLayout/AuthLayout';
import MainLayout from '@src/layout/mainLayout/MainLayout';

// const Login = lazy(() => import("./features/auth/Login"));
// const SignUp = lazy(() => import("./features/auth/SignUp"));

function Login() {
  return <div>Login</div>;
}

function Home() {
  return <div>Home</div>;
}

function Mockup() {
  return <div>Mockup</div>;
}

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="mockup" element={<Mockup />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
