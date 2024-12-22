import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { t } from '../lib/i18n';

export default function NotFound() {
  const navigate = useNavigate();

  // Auto-redirect after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/services');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full text-center text-white">
        <div className="mb-6 relative">
          <div className="absolute inset-0 animate-ping opacity-50">
            <FileQuestion className="h-16 w-16 mx-auto" />
          </div>
          <FileQuestion className="h-16 w-16 mx-auto relative" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-white/80 mb-6">
          Redirecting you to the home page...
        </p>
        <Button
          onClick={() => navigate('/services')}
          variant="secondary"
          className="w-full"
        >
          {t('go_home')}
        </Button>
      </div>
    </div>
  );
}