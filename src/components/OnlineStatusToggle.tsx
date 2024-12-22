import React from 'react';
import { Switch } from './ui/Switch';
import { supabase } from '../lib/supabase';
import { useToast } from './ui/Toaster';
import { t } from '../lib/i18n';
import { Wifi, WifiOff } from 'lucide-react';

interface OnlineStatusToggleProps {
  serviceId: string;
  initialStatus: boolean;
  onStatusChange?: (status: boolean) => void;
}

export function OnlineStatusToggle({ 
  serviceId, 
  initialStatus,
  onStatusChange 
}: OnlineStatusToggleProps) {
  const [isOnline, setIsOnline] = React.useState(initialStatus);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const { toast } = useToast();

  const updateOnlineStatus = async (status: boolean) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('motoservices')
        .update({ online_status: status })
        .eq('id', serviceId);

      if (error) throw error;

      setIsOnline(status);
      onStatusChange?.(status);

      toast({
        title: status ? t('now_online') : t('now_offline'),
        description: status ? t('can_receive_requests') : t('cannot_receive_requests'),
        variant: status ? 'success' : 'default'
      });
    } catch (error) {
      console.error('Error updating online status:', error);
      toast({
        title: t('status_update_error'),
        description: t('try_again'),
        variant: 'error'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isOnline ? (
        <Wifi className="h-4 w-4 text-green-500" />
      ) : (
        <WifiOff className="h-4 w-4 text-gray-400" />
      )}
      <Switch
        checked={isOnline}
        onCheckedChange={updateOnlineStatus}
        disabled={isUpdating}
        aria-label="Online status"
      />
      <span className="text-sm text-gray-600">
        {isOnline ? t('online') : t('offline')}
      </span>
    </div>
  );
}