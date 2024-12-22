import React from 'react';
import { Button } from './ui/Button';
import { MapPin, Package, ShoppingCart, Utensils } from 'lucide-react';
import { t } from '../lib/i18n';

interface ServiceLocationModalProps {
  serviceType: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (location: string) => void;
}

const serviceIcons = {
  'Package Delivery': Package,
  'Grocery Shopping': ShoppingCart,
  'Food Delivery': Utensils,
};

export function ServiceLocationModal({ serviceType, isOpen, onClose, onSubmit }: ServiceLocationModalProps) {
  const [location, setLocation] = React.useState('');
  const Icon = serviceIcons[serviceType as keyof typeof serviceIcons] || Package;

  if (!isOpen) return null;

  const getPrompt = () => {
    switch (serviceType) {
      case 'Package Delivery':
        return t('where_pickup_package');
      case 'Grocery Shopping':
        return t('which_store');
      case 'Food Delivery':
        return t('which_restaurant');
      default:
        return t('where_start');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(location);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full transform transition-all duration-300 scale-100">
        <div className="text-center mb-6">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getPrompt()}
          </h2>
          <p className="text-gray-600">{t('enter_pickup_start')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={t('enter_location')}
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={onClose}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" className="flex-1">
              {t('continue')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}