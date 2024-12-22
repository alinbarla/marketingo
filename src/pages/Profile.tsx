import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../lib/i18n';
import { User, Phone, Mail, Shield } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <div className="text-center">
        <div className="relative inline-block">
          <img
            src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}`}
            alt={user.full_name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          {user.verified && (
            <div className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full">
              <Shield className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
        <h1 className="mt-4 text-2xl font-bold">{user.full_name}</h1>
        <p className="text-gray-600">{user.role === 'motoservice' ? t('provider_role') : t('user_role')}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center">
            <User className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">{t('full_name')}</p>
              <p className="font-medium">{user.full_name}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Phone className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">{t('phone')}</p>
              <p className="font-medium">{user.phone_number || t('not_provided')}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">{t('email')}</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}