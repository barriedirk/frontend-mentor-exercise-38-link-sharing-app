import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@src/store/useAuthStore';

function AuthGuard() {
  const { token } = useAuthStore();

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthGuard;
