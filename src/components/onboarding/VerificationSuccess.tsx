import React from 'react';
import { Shield, Check } from 'lucide-react';
import { t } from '../../lib/i18n';

export function VerificationSuccess() {
  return (
    <div className="text-center text-white">
      <div className="mb-8 relative">
        <div className="absolute inset-0 animate-ping">
          <Shield className="h-24 w-24 text-green-400 mx-auto" />
        </div>
        <Shield className="h-24 w-24 text-green-400 mx-auto relative">
          <Check className="h-12 w-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
        </Shield>
      </div>
      <h2 className="text-3xl font-bold mb-4">{t('verification_complete')}</h2>
      <p className="text-white/70">
        {t('verification_success')}
      </p>
    </div>
  );
}