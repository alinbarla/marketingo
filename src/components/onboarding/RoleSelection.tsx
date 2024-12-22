import React from 'react';
import { User, Bike } from 'lucide-react';
import { t } from '../../lib/i18n';

interface RoleSelectionProps {
  onSelect: (role: string) => void;
}

export function RoleSelection({ onSelect }: RoleSelectionProps) {
  return (
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-8">{t('choose_role')}</h2>
      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => onSelect('user')}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all group"
        >
          <div className="flex flex-col items-center">
            <div className="bg-indigo-500 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <User className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">{t('user_role')}</h3>
            <p className="text-sm text-white/70 mt-2">
              {t('user_description')}
            </p>
          </div>
        </button>

        <button
          onClick={() => onSelect('motoservice')}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all group"
        >
          <div className="flex flex-col items-center">
            <div className="bg-purple-500 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Bike className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">{t('provider_role')}</h3>
            <p className="text-sm text-white/70 mt-2">
              {t('provider_description')}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}