import { useAuthStore } from '@src/store/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();

  return () => {
    useAuthStore.getState().logout();

    toast('You’ve been logged out');
    navigate('/login');
  };
}
