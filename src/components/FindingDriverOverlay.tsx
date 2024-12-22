import React from 'react';
import { Bike } from 'lucide-react';
import { t } from '../lib/i18n';

export function FindingDriverOverlay() {
  return (
    <div className="fixed inset-0 bg-indigo-900/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-sm w-full mx-4">
        <div className="relative">
          {/* Road line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 animate-[gradient_2s_linear_infinite]" />
          </div>

          {/* Moving motorcycle */}
          <div className="relative">
            <div className="animate-[ride_2s_linear_infinite]">
              <div className="bg-white p-4 rounded-full shadow-lg inline-block">
                <Bike className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center mt-8 space-y-3">
          <h3 className="text-xl font-semibold text-white">{t('finding_perfect_driver')}</h3>
          <div className="flex justify-center gap-1">
            <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="h-2 w-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}