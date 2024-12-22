import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { t } from '../lib/i18n';
import { 
  Bell, Moon, Globe, Shield, HelpCircle, LogOut,
  ChevronRight
} from 'lucide-react';

export default function Settings() {
  const { signOut } = useAuth();

  const settingsSections = [
    {
      title: t('preferences'),
      items: [
        { icon: Bell, label: t('notifications'), onClick: () => {} },
        { icon: Moon, label: t('dark_mode'), onClick: () => {} },
        { icon: Globe, label: t('language'), onClick: () => {} },
      ]
    },
    {
      title: t('security'),
      items: [
        { icon: Shield, label: t('privacy'), onClick: () => {} },
      ]
    },
    {
      title: t('support'),
      items: [
        { icon: HelpCircle, label: t('help'), onClick: () => {} },
      ]
    }
  ];

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{t('settings')}</h1>

      {settingsSections.map((section) => (
        <div key={section.title} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-2">{section.title}</h2>
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 text-gray-400 mr-3" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="pt-4">
        <Button
          onClick={() => signOut()}
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-2" />
          {t('sign_out')}
        </Button>
      </div>
    </div>
  );
}