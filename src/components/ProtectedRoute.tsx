import { useApp } from '@/contexts/AppContext';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useApp();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (!user || isLoggedIn !== 'true') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;