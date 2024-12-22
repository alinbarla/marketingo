import React from 'react';
import { Button } from '../ui/Button';
import { Phone } from 'lucide-react';
import { t } from '../../lib/i18n';

interface PhoneNumberProps {
  onSubmit: (phone: string) => void;
}

export function PhoneNumber({ onSubmit }: PhoneNumberProps) {
  const [phone, setPhone] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      onSubmit(phone.trim());
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.length <= 14) { // (123) 456-7890
      setPhone(formatted);
    }
  };

  return (
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-8">{t('whats_your_phone')}</h2>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <input
            type="tel"
            value={phone}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 mb-6"
            placeholder="(123) 456-7890"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={phone.replace(/\D/g, '').length !== 10}
          className="w-full bg-white/10 hover:bg-white/20"
        >
          {t('continue')}
        </Button>
      </form>
    </div>
  );
}