import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { MotoService } from '../types';
import { formatCurrency } from '../lib/utils';
import { Star, MapPin, Clock, Shield } from 'lucide-react';
import { StoryView } from '../components/StoryView';

export default function ServiceList() {
  const [services, setServices] = useState<MotoService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<MotoService | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from('motoservices')
          .select(`
            *,
            users (
              full_name,
              avatar_url
            )
          `)
          .order('rating', { ascending: false });

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Expert Motorcycle Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with professional motorcycle mechanics and service providers in your area
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            to={`/services/${service.id}`}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="relative h-56">
              <img
                src={service.avatar_url}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={service.users?.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(service.users?.full_name || 'MS')}
                    alt={service.users?.full_name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                  />
                  <div className="text-white">
                    <p className="font-medium">{service.users?.full_name}</p>
                    <div className="flex items-center text-sm">
                      <Shield className="w-4 h-4 mr-1" />
                      <span>Verified Provider</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-600 line-clamp-2">
                {service.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Mobile Service
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Available Now
                </span>
              </div>
              <div className="pt-4 border-t flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium text-gray-900">
                    {service.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({service.reviews_count} reviews)
                  </span>
                </div>
                <span className="text-lg font-semibold text-indigo-600">
                  {formatCurrency(service.hourly_rate)}/hr
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}