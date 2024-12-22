import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { OnboardingFlow } from '../components/OnboardingFlow';

export default function Onboarding() {
  const { user } = useAuth();

  if (user?.verified) {
    return <Navigate to="/services" replace />;
  }

  return <OnboardingFlow />;
}