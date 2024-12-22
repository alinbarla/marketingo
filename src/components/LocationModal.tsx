import React from 'react';
import { Button } from './ui/Button';
import { MapPin } from 'lucide-react';
import { t } from '../lib/i18n';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pickup: string, dropoff: string) => void;
}

export function LocationModal({ isOpen, onClose, onSubmit }: LocationModalProps) {
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pickup, dropoff);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">{t('enter_location')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('pickup_location')}</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={t('enter_pickup')}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('dropoff_location')}</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={t('enter_dropoff')}
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={onClose}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" className="flex-1">
              {t('confirm')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}