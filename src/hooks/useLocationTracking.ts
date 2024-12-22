import { useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { startLocationTracking } from '../lib/notifications';
import { debug } from '../lib/debug';

export function useLocationTracking(orderId?: string) {
  const { user } = useAuth();

  const updateLocation = useCallback(async (position: { lat: number; lng: number }) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('driver_locations')
        .upsert({
          driver_id: user.id,
          order_id: orderId,
          latitude: position.lat,
          longitude: position.lng
        });

      if (error) throw error;
    } catch (error) {
      debug.log('error', 'Error updating location:', error);
    }
  }, [user, orderId]);

  useEffect(() => {
    if (!user || user.role !== 'motoservice') return;

    const stopTracking = startLocationTracking(
      updateLocation,
      (error) => debug.log('error', 'Location tracking error:', error)
    );

    return () => {
      stopTracking();
    };
  }, [user, updateLocation]);
}