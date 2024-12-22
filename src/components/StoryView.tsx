import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MotoService } from '../types';
import { t } from '../lib/i18n';

interface StoryViewProps {
  service: MotoService;
  onClose: () => void;
}

export function StoryView({ service, onClose }: StoryViewProps) {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 30);

    // Close the story when progress reaches 100%
    if (progress >= 100) {
      onClose();
    }

    return () => clearInterval(timer);
  }, [isOpen, progress, onClose]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300" 
        aria-label={t('close')}
      >
        <X className="h-6 w-6" />
      </button>
      <div className="w-full max-w-lg mx-auto p-4">
        <img
          src={service.avatar_url}
          alt={service.name}
          className="w-full h-[70vh] object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-3xl font-bold text-white mb-2">{service.name}</h2>
          <p className="text-gray-200">{service.description}</p>
        </div>
      </div>
    </div>
  );
}