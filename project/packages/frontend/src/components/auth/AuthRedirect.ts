import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@src/store/useAuthStore';

export const AuthRedirect = () => {
  const shouldRedirect = useAuthStore((s) => s.shouldRedirect);
  const resetRedirect = useAuthStore((s) => s.resetRedirect);
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirect) {
      resetRedirect();
      navigate('/login');
    }
  }, [shouldRedirect, resetRedirect, navigate]);

  return null;
};
