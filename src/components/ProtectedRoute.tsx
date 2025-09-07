import { useApp } from '@/contexts/AppContext';
import { Navigate } from 'react-router-dom';
import Navigation from './Navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
};

export default ProtectedRoute;