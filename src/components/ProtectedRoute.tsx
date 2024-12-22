import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingScreen } from './ui/LoadingScreen';
import { t } from '../lib/i18n';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const isOnboardingRoute = window.location.pathname === '/onboarding';

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.verified && !isOnboardingRoute) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}