import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { t } from '../../lib/i18n';

interface ToastProps {
  variant?: 'default' | 'success' | 'error';
  title: string;
  description?: string;
  onClose: () => void;
}

const icons = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
};

const variants = {
  default: 'bg-white border-gray-200',
  success: 'bg-green-50 border-green-100',
  error: 'bg-red-50 border-red-100',
};

const iconColors = {
  default: 'text-blue-500',
  success: 'text-green-500',
  error: 'text-red-500',
};
export function Toast({
  variant = 'default',
  title,
  description,
  onClose,
}: ToastProps) {
  const Icon = icons[variant];

  return (
    <div
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border shadow-xl backdrop-blur-lg transition-all duration-300 animate-slideIn',
        variants[variant]
      )}
    >
      <div className="p-5 flex items-start gap-4">
        <div className={cn('flex-shrink-0 mt-0.5', iconColors[variant])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn(
            'text-sm font-medium',
            variant === 'error' ? 'text-red-900' :
            variant === 'success' ? 'text-green-900' :
            'text-gray-900'
          )}>{title}</p>
            {description && (
              <p className={cn(
                'mt-1 text-sm',
                variant === 'error' ? 'text-red-700' :
                variant === 'success' ? 'text-green-700' :
                'text-gray-600'
              )}>{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className={cn(
              'ml-4 inline-flex rounded-xl p-2 transition-all transform hover:scale-110',
              variant === 'error' ? 'text-red-500 hover:bg-red-100' :
              variant === 'success' ? 'text-green-500 hover:bg-green-100' :
              'text-gray-400 hover:bg-gray-100'
            )}
            aria-label={t('close')}
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
    </div>
  );
}