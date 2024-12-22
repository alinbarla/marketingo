import React from 'react';
import { StoryStep } from './StoryStep';
import { ServiceLocationModal } from './ServiceLocationModal';
import { PriceConfirmationModal } from './PriceConfirmationModal';
import { FindingDriverOverlay } from './FindingDriverOverlay';
import { t } from '../lib/i18n';

interface ServiceFlowProps {
  serviceType: string;
  onLocationSubmit: (location: string) => void;
  onPriceAccept: () => void;
  onClose: () => void;
}

export function ServiceFlow({
  serviceType,
  onLocationSubmit,
  onPriceAccept,
  onClose
}: ServiceFlowProps) {
  const [step, setStep] = React.useState(1);
  const [pickupLocation, setPickupLocation] = React.useState('');

  const handleLocationSubmit = (location: string) => {
    setPickupLocation(location);
    setStep(2);
    onLocationSubmit(location);
  };

  const handlePriceAccept = () => {
    setStep(3);
    onPriceAccept();
  };

  return (
    <>
      <StoryStep active={step === 1} onComplete={() => setStep(2)}>
        <LocationModal
          serviceType={serviceType}
          isOpen={true} 
          title={t('set_location')}
          onClose={onClose}
          onSubmit={handleLocationSubmit}
        />
      </StoryStep>

      <StoryStep active={step === 2}>
        <PriceConfirmationModal
          isOpen={true}
          onClose={onClose}
          onAccept={handlePriceAccept}
          price={60}
          serviceFee={10}
        />
      </StoryStep>

      <StoryStep active={step === 3}>
        <FindingDriverOverlay />
      </StoryStep>
    </>
  );
}