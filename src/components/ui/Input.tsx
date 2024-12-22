import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export function Input({ className, icon, error, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        className={cn(
          'w-full bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
          icon && 'pl-10',
          error && 'border-red-300 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}