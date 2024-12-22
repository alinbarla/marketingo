import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  label: string;
}

export function StepIndicator({ currentStep, totalSteps, label }: StepIndicatorProps) {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
      <span className="text-white/70 text-sm font-medium">
        {label}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-4 rounded-full transition-colors ${
              i < currentStep ? 'bg-white' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}