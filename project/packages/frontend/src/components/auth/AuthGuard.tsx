import { Navigate, Outlet } from 'react-router-dom';

// import useAuth from '@/context/useAuth';

function AuthGuard() {
  // const { user, loading } = useAuth();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const user = false;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthGuard;
