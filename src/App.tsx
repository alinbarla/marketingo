import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/ui/Toaster';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Wallet from './pages/Wallet';
import { AppLayout } from './components/layout/AppLayout';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import ServiceTypeSelection from './pages/ServiceTypeSelection';
import LocationSelect from './pages/LocationSelect';
import ServiceList from './pages/ServiceList';
import ServiceDetail from './pages/ServiceDetail';
import Chat from './pages/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { debug } from './lib/debug';

// Enable debug logging in development
if (import.meta.env.DEV) {
  debug.enable();
}

// Separate component for routes to access auth context
function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      
      {/* 404 catch-all route */}
      <Route path="*" element={<NotFound />} />
      
      {/* Protected routes with layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/service-types" element={<ServiceTypeSelection />} />
        <Route path="/location-select/:serviceTypeId" element={<LocationSelect />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/chat/:orderId" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/" element={<Navigate to="/services" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;