import React from 'react';
import { cn } from '../lib/utils';
import { t } from '../lib/i18n';
import { StepIndicator } from './StepIndicator';

interface StoryStepProps {
  children: React.ReactNode;
  active: boolean;
  currentStep?: number;
  totalSteps?: number;
  onComplete?: () => void;
  className?: string;
}

export function StoryStep({ 
  children, 
  active, 
  currentStep,
  totalSteps,
  onComplete, 
  className 
}: StoryStepProps) {
  const [isEntering, setIsEntering] = React.useState(false);

  React.useEffect(() => {
    if (active) {
      // Trigger enter animation
      const timer = setTimeout(() => setIsEntering(true), 50);
      return () => clearTimeout(timer);
    }
    setIsEntering(false);
  }, [active]);

  if (!active) return null;

  return (
    <div className={cn(
      "fixed inset-0 bg-gradient-to-b from-indigo-900 to-purple-900 z-50",
      "flex flex-col items-center justify-center p-4",
      "transition-opacity duration-500",
      "transition-opacity duration-500",
      isEntering ? "opacity-100" : "opacity-0",
      className
    )}>
      {currentStep && totalSteps && (
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          label={t('step_progress', { current: currentStep, total: totalSteps })}
        />
      )}
      {/* Content */}
      <div className={cn(
        "w-full max-w-md mx-auto",
        "transition-all duration-500 transform",
        isEntering 
          ? "translate-y-0 opacity-100" 
          : "translate-y-4 opacity-0"
      )}>
        {children}
      </div>
    </div>
  );
}