import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { MotoService, Review } from '../types';
import { formatCurrency, formatDate } from '../lib/utils';
import { t } from '../lib/i18n';
import { Star, MapPin, Clock } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState<MotoService | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const isOwner = user?.id === service?.user_id;

  useEffect(() => {
    async function fetchServiceAndReviews() {
      try {
        const [serviceResponse, reviewsResponse] = await Promise.all([
          supabase
            .from('motoservices')
            .select('*')
            .eq('id', id)
            .single(),
          supabase
            .from('reviews')
            .select('*, users(full_name, avatar_url)')
            .eq('motoservice_id', id)
            .order('created_at', { ascending: false })
        ]);

        if (serviceResponse.error) throw serviceResponse.error;
        if (reviewsResponse.error) throw reviewsResponse.error;

        setService(serviceResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchServiceAndReviews();
    }
  }, [id]);

  const handleBookService = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          motoservice_id: service?.id,
          status: 'pending',
          pickup_location: '',
          dropoff_location: '',
          amount: service?.hourly_rate || 0,
        })
        .select()
        .single();

      if (error) throw error;
      navigate(`/chat/${data.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Service not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={service.avatar_url}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-4xl font-bold">{service.name}</h1>
            <div className="mt-2 flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1">
                {service.rating.toFixed(1)} ({service.reviews_count} {t('reviews')})
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">{t('about')}</h2>
              <p className="text-gray-600">{service.description}</p>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">{t('reviews')}</h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center">
                        <img
                          src={review.users?.avatar_url}
                          alt={review.users?.full_name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="ml-4">
                          <p className="font-medium">{review.users?.full_name}</p>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-400"
                                fill="currentColor"
                              />
                            ))}
                          </div>
                        </div>
                        <span className="ml-auto text-sm text-gray-500">
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                      {review.comment && (
                        <p className="mt-4 text-gray-600">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center">
                  {isOwner && (
                    <div className="mb-4">
                      <OnlineStatusToggle
                        serviceId={service.id}
                        initialStatus={service.online_status}
                      />
                    </div>
                  )}
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(service.hourly_rate)}
                  </p>
                  <p className="text-gray-500">per hour</p>
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full"
                    onClick={handleBookService}
                    disabled={
                      service.status === 'busy' || 
                      isOwner || 
                      !service.online_status
                    }
                  >
                    {service.status === 'busy'
                      ? t('currently_busy')
                      : isOwner
                      ? t('your_service')
                      : !service.online_status
                      ? t('service_offline')
                      : t('book_now')}
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{t('response_time')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{t('mobile_service')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}