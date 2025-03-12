import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

const ProtectedRoute = ({ isLoggedIn, isLoading, children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      navigate('/login', { replace: true });
    }
  }, [navigate, isLoggedIn, isLoading]);

  return children;
};

export default ProtectedRoute;
