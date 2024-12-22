import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { User, Wrench } from 'lucide-react';

export default function RoleSelection() {
  const { updateUserRole } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Choose Your Role
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Select how you want to use MotoService
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => updateUserRole('user')}
            className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4"
          >
            <User className="h-12 w-12 text-indigo-600" />
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">User</h3>
              <p className="mt-1 text-sm text-gray-500">
                Find and book motorcycle services
              </p>
            </div>
          </button>

          <button
            onClick={() => updateUserRole('motoservice')}
            className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4"
          >
            <Wrench className="h-12 w-12 text-purple-600" />
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Service Provider</h3>
              <p className="mt-1 text-sm text-gray-500">
                Offer your motorcycle services
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}