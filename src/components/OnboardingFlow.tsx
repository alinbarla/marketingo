import React from 'react';
import { StoryStep } from './StoryStep';
import { RoleSelection } from './onboarding/RoleSelection';
import { ProfilePicture } from './onboarding/ProfilePicture';
import { FullName } from './onboarding/FullName';
import { DocumentUpload } from './onboarding/DocumentUpload';
import { PaymentInfo } from './onboarding/PaymentInfo';
import { VerificationSuccess } from './onboarding/VerificationSuccess';
import { useAuth } from '../contexts/AuthContext';
import { PhoneNumber } from './onboarding/PhoneNumber';

const TOTAL_STEPS = 7;

export function OnboardingFlow() {
  const [step, setStep] = React.useState(1);
  const { updateUserProfile } = useAuth();
  const [profile, setProfile] = React.useState({
    role: '',
    avatarUrl: '',
    fullName: '',
    phoneNumber: '',
    documentUrl: ''
  });

  const handleComplete = async () => {
    try {
      await updateUserProfile({
        role: profile.role as 'user' | 'motoservice',
        full_name: profile.fullName,
        avatar_url: profile.avatarUrl,
        phone_number: profile.phoneNumber,
        document_url: profile.documentUrl,
        verified: true
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <StoryStep 
        active={step === 1} 
        currentStep={1}
        totalSteps={TOTAL_STEPS}
      >
        <RoleSelection
          onSelect={(role) => {
            setProfile(prev => ({ ...prev, role }));
            setStep(2);
          }}
        />
      </StoryStep>

      <StoryStep 
        active={step === 2}
        currentStep={2}
        totalSteps={TOTAL_STEPS}
      >
        <ProfilePicture
          onUpload={(url) => {
            setProfile(prev => ({ ...prev, avatarUrl: url }));
            setStep(3);
          }}
        />
      </StoryStep>

      <StoryStep 
        active={step === 3}
        currentStep={3}
        totalSteps={TOTAL_STEPS}
      >
        <PhoneNumber
          onSubmit={(phone) => {
            setProfile(prev => ({ ...prev, phoneNumber: phone }));
            setStep(4);
          }}
        />
      </StoryStep>

      <StoryStep 
        active={step === 4}
        currentStep={4}
        totalSteps={TOTAL_STEPS}
      >
        <FullName
          onSubmit={(name) => {
            setProfile(prev => ({ ...prev, fullName: name }));
            setStep(5);
          }}
        />
      </StoryStep>

      <StoryStep 
        active={step === 5}
        currentStep={5}
        totalSteps={TOTAL_STEPS}
      >
        <DocumentUpload
          role={profile.role}
          onUpload={(url) => {
            setProfile(prev => ({ ...prev, documentUrl: url }));
            setStep(6);
          }}
        />
      </StoryStep>

      {profile.role === 'motoservice' && (
        <StoryStep
          active={step === 6}
          currentStep={6}
          totalSteps={TOTAL_STEPS}
        >
          <PaymentInfo
            onSubmit={() => setStep(7)}
          />
        </StoryStep>
      )}

      <StoryStep
        active={step === 6}
        currentStep={6}
        totalSteps={TOTAL_STEPS}
        onComplete={handleComplete}
      >
        <VerificationSuccess />
      </StoryStep>
    </>
  );
}