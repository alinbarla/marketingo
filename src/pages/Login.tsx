import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Bike } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GoogleButton } from '../components/ui/GoogleButton';
import { useToast } from '../components/ui/Toaster';
import { debug } from '../lib/debug';
import { t } from '../lib/i18n';
import { Card } from '../components/ui/Card';

export default function Login() {
  const { user, signInWithGoogle, loading } = useAuth();
  const { toast } = useToast();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGoogleSignIn = async () => {
    if (isAuthenticating) return;

    try {
      setIsAuthenticating(true);
      await signInWithGoogle();
    } catch (error: any) {
      debug.log('error', 'Authentication error', error);
      toast({
        title: t('error'),
        description: error.message || t('try_again'),
        variant: 'error'
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="relative">
          <div className="absolute inset-0">
            <div className="h-16 w-16 rounded-full bg-white/30 animate-ping" />
          </div>
          <div className="relative bg-white p-4 rounded-2xl shadow-lg">
            <Bike className="h-8 w-8 text-indigo-600 animate-[ride_2s_linear_infinite]" />
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-md animate-slideIn relative z-10">
        <Card className="overflow-visible backdrop-blur-lg bg-white/10">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              {isAuthenticating ? (
                <div className="relative">
                  <div className="absolute inset-0">
                    <div className="h-8 w-8 rounded-full bg-indigo-400/30 animate-ping" />
                  </div>
                  <Bike className="h-8 w-8 text-indigo-600 animate-[ride_2s_linear_infinite]" />
                </div>
              ) : (
                <LogIn className="h-8 w-8 text-indigo-600" />
              )}
            </div>
          </div>
          <Card.Body className="pt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('welcome_back')}
            </h2>
            <p className="text-white/80 mb-8">
              {t('sign_in_with_google')}
            </p>
            <div className="space-y-6">
              <GoogleButton
                onClick={handleGoogleSignIn}
                isLoading={isAuthenticating}
                disabled={isAuthenticating}
              >
                {t('continue_with_google')}
              </GoogleButton>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}