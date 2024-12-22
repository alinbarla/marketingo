import { debug } from './debug';

export async function requestNotificationPermission() {
  try {
    if (!('Notification' in window)) {
      debug.log('warn', 'Notifications not supported');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    debug.log('error', 'Error requesting notification permission:', error);
    return false;
  }
}

export function showNotification(title: string, options?: NotificationOptions) {
  try {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    }
  } catch (error) {
    debug.log('error', 'Error showing notification:', error);
  }
}

let watchId: number | null = null;

export function startLocationTracking(
  onLocation: (position: { lat: number; lng: number }) => void,
  onError: (error: GeolocationPositionError) => void
) {
  if (!navigator.geolocation) {
    debug.log('error', 'Geolocation not supported');
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      onLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    },
    onError,
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );

  return () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
  };
}