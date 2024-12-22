import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { t } from '../lib/i18n';
import { 
  DollarSign, ArrowUpRight, ArrowDownLeft, 
  CreditCard, History
} from 'lucide-react';

export default function Wallet() {
  const { user } = useAuth();

  // Mock data - in a real app, this would come from your backend
  const balance = 1234.56;
  const transactions = [
    { 
      id: 1, 
      type: 'credit',
      amount: 50.00,
      description: 'Package Delivery',
      date: '2024-03-15T10:30:00Z'
    },
    { 
      id: 2, 
      type: 'withdrawal',
      amount: 100.00,
      description: 'Bank Transfer',
      date: '2024-03-14T15:45:00Z'
    },
    // Add more transactions as needed
  ];

  if (user?.role !== 'motoservice') {
    return null;
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">{t('available_balance')}</h2>
          <DollarSign className="w-6 h-6" />
        </div>
        <p className="text-3xl font-bold mb-4">
          {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(balance)}
        </p>
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-white/10 hover:bg-white/20"
            onClick={() => {}}
          >
            <ArrowUpRight className="w-4 h-4 mr-2" />
            {t('withdraw')}
          </Button>
          <Button
            className="flex-1 bg-white/10 hover:bg-white/20"
            onClick={() => {}}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {t('bank_accounts')}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <History className="w-5 h-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-medium">{t('recent_transactions')}</h2>
          </div>
        </div>
        <div className="divide-y">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 flex items-center">
              <div className={`p-2 rounded-full mr-4 ${
                transaction.type === 'credit' 
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}>
                {transaction.type === 'credit' 
                  ? <ArrowDownLeft className="w-5 h-5" />
                  : <ArrowUpRight className="w-5 h-5" />
                }
              </div>
              <div className="flex-1">
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <p className={`font-medium ${
                transaction.type === 'credit'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}
                {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}