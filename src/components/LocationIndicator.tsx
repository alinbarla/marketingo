import React from 'react';
import { t } from '../lib/i18n';

export function LocationIndicator() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10">
      <div className="relative">
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-ping absolute h-8 w-8 rounded-full bg-red-400 opacity-75" />
            <div className="h-8 w-8 rounded-full bg-red-500 opacity-25" />
          </div>
          
          <div className="w-8 h-8 bg-red-500 rounded-full shadow-lg" />
          
          <div className="absolute top-6 left-1/2 -translate-x-1/2">
            <div 
              className="w-4 h-4 bg-red-500 shadow-lg"
              style={{
                clipPath: 'polygon(50% 100%, 0 0, 100% 0)'
              }}
              aria-label={t('location_indicator')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}