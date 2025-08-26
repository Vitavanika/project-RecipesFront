import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../redux/auth/selectors.js';

export const useAuth = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return { isAuthenticated: isLoggedIn };
};


