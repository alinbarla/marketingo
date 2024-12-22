import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Package, Settings, User, Wallet } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { t } from '../../lib/i18n';
import { cn } from '../../lib/utils';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = user?.role === 'motoservice' 
    ? [
        { icon: User, label: t('profile'), path: '/profile' },
        { icon: Package, label: t('services'), path: '/services' },
        { icon: Wallet, label: t('wallet'), path: '/wallet' },
        { icon: Settings, label: t('settings'), path: '/settings' },
      ]
    : [
        { icon: Package, label: t('services'), path: '/service-types' },
        { icon: User, label: t('profile'), path: '/profile' },
        { icon: Settings, label: t('settings'), path: '/settings' },
      ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 pb-safe-area">
      <div className="flex items-center justify-around max-w-md mx-auto px-6 h-16">
        {navItems.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all transform",
              isActive(path)
                ? "text-indigo-600 scale-110"
                : "text-gray-500 hover:text-indigo-600 hover:scale-105"
            )}
          >
            <div className={cn(
              "relative p-2.5 rounded-xl transition-all transform",
              isActive(path) ? "bg-indigo-100 scale-110" : "hover:bg-gray-100"
            )}>
              <Icon className="h-5 w-5" />
              {isActive(path) && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 bg-indigo-600 rounded-full animate-pulse" />
                </div>
              )}
            </div>
            <span className="text-xs font-medium tracking-wide">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}