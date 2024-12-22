import React from 'react';
import { Bike } from 'lucide-react';
import { t } from '../../lib/i18n';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = t('loading') }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center gap-6 animate-slideIn">
        <div className="relative">
          <div className="absolute inset-0">
            <div className="h-16 w-16 rounded-full bg-white/30 animate-ping" />
          </div>
          <div className="relative backdrop-blur-sm p-4 rounded-2xl">
            <Bike className="h-8 w-8 text-white animate-[ride_2s_linear_infinite]" />
          </div>
        </div>
        <p className="text-white font-medium tracking-wide text-lg">
          {message}
        </p>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}