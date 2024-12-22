import React from 'react';
import { Button } from '../ui/Button';
import { CreditCard } from 'lucide-react';
import { t } from '../../lib/i18n';

interface PaymentInfoProps {
  onSubmit: () => void;
}

export function PaymentInfo({ onSubmit }: PaymentInfoProps) {
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvc, setCvc] = React.useState('');

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const groups = numbers.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19);
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would securely send this to Stripe
    // For demo purposes, we'll just proceed
    onSubmit();
  };

  return (
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-8">{t('add_payment_info')}</h2>
      <div className="max-w-sm mx-auto">
        <div className="bg-white/10 w-32 h-32 mx-auto mb-6 rounded-2xl flex items-center justify-center">
          <CreditCard className="h-16 w-16" />
        </div>
        <p className="text-white/70 mb-6">
          {t('payment_info_description')}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder={t('card_number')}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              maxLength={19}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder={t('expiry')}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              maxLength={5}
              required
            />
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
              placeholder={t('cvc')}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              maxLength={3}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-white/10 hover:bg-white/20"
            disabled={
              cardNumber.replace(/\s/g, '').length !== 16 ||
              expiry.length !== 5 ||
              cvc.length !== 3
            }
          >
            {t('continue')}
          </Button>
        </form>
      </div>
    </div>
  );
}