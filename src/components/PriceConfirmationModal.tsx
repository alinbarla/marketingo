import React from 'react';
import { Button } from './ui/Button';
import { DollarSign } from 'lucide-react';
import { t } from '../lib/i18n';

interface PriceConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  price: number;
  serviceFee: number;
}

export function PriceConfirmationModal({
  isOpen,
  onClose,
  onAccept,
  price,
  serviceFee
}: PriceConfirmationModalProps) {
  if (!isOpen) return null;

  const total = price + serviceFee;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('trip_price')}</h2>
          <p className="text-gray-600">{t('review_trip_details')}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('base_price')}</span>
            <span className="font-semibold">${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('service_fee')}</span>
            <span className="font-semibold">${serviceFee.toFixed(2)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{t('total')}</span>
              <span className="text-xl font-bold text-indigo-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
          >
            {t('cancel')}
          </Button>
          <Button
            className="flex-1"
            onClick={onAccept}
          >
            {t('accept_continue')}
          </Button>
        </div>
      </div>
    </div>
  );
}