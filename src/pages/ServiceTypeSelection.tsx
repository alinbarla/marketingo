import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Package, ShoppingCart, Utensils } from 'lucide-react';
import { useToast } from '../components/ui/Toaster';
import { t } from '../lib/i18n';

interface ServiceType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const iconMap = {
  'package': Package,
  'shopping-cart': ShoppingCart,
  'utensils': Utensils,
};

export default function ServiceTypeSelection() {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchServiceTypes() {
      try {
        const { data, error } = await supabase
          .from('service_types')
          .select('*');

        if (error) throw error;
        setServiceTypes(data || []);
      } catch (error) {
        toast({
          title: 'Error loading services',
          description: 'Please try again later',
          variant: 'error'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchServiceTypes();
  }, [toast]);

  const handleServiceSelect = (serviceType: ServiceType) => {
    navigate(`/location-select/${serviceType.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('expert_services')}</h1>
          <p className="text-lg text-gray-600">{t('services_description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceTypes.map((type) => {
            const Icon = iconMap[type.icon as keyof typeof iconMap];
            return (
              <button
                key={type.id}
                onClick={() => handleServiceSelect(type)}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-indigo-100 rounded-full">
                    <Icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {t(`service_types.${type.name.toLowerCase().replace(' ', '_')}`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`service_descriptions.${type.name.toLowerCase().replace(' ', '_')}`)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}