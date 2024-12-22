import { useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toaster';
import { requestNotificationPermission, showNotification } from '../lib/notifications';
import { debug } from '../lib/debug';

export function useNotifications() {
  const { user } = useAuth();
  const { toast } = useToast();

  const setupNotifications = useCallback(async () => {
    if (!user) return;

    try {
      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) {
        debug.log('warn', 'Notification permission denied');
        return;
      }

      // Subscribe to notifications
      const subscription = supabase
        .channel('notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const notification = payload.new as any;
            
            // Show system notification
            showNotification(notification.title, {
              body: notification.body,
              icon: '/icon.png',
              badge: '/badge.png',
              data: notification.data
            });

            // Show toast
            toast({
              title: notification.title,
              description: notification.body,
              variant: 'default'
            });
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      debug.log('error', 'Error setting up notifications:', error);
    }
  }, [user, toast]);

  useEffect(() => {
    const cleanup = setupNotifications();
    return () => {
      cleanup?.();
    };
  }, [setupNotifications]);
}