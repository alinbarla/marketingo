import React from 'react';
import { Button } from '../ui/Button';
import { t } from '../../lib/i18n';

interface FullNameProps {
  onSubmit: (name: string) => void;
}

export function FullName({ onSubmit }: FullNameProps) {
  const [name, setName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-8">{t('whats_your_name')}</h2>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 mb-6"
          placeholder={t('full_name')}
          required
        />
        <Button
          type="submit"
          disabled={!name.trim()}
          className="w-full bg-white/10 hover:bg-white/20"
        >
          {t('continue')}
        </Button>
      </form>
    </div>
  );
}