import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { t } from '../../lib/i18n';

interface ProfilePictureProps {
  onUpload: (url: string) => void;
}

export function ProfilePicture({ onUpload }: ProfilePictureProps) {
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

      onUpload(publicUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-8">{t('add_profile_picture')}</h2>
      <div className="max-w-sm mx-auto">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-32 h-32 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all group"
        >
          <Camera className="h-12 w-12 group-hover:scale-110 transition-transform" />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept="image/*"
          className="hidden"
        />
        <p className="text-white/70 mb-6">
          {t('upload_photo')}
        </p>
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full bg-white/10 hover:bg-white/20"
        >
          {uploading ? t('uploading') : t('choose_photo')}
        </Button>
      </div>
    </div>
  );
}