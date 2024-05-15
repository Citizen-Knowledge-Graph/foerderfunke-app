import React, { useEffect, useState } from 'react';
import OnboardingList from './components/OnboardingList';
import { fetchOnboardingScreenData } from './OnboardingController';
import LoadingScreen from '../LoadingScreen';
import { useOnboardingStore } from '../../storage/zustand';

// Component
const OnboardingScreen = () => {
  const [onboardingScreenData, setOnboardingScreenData] = useState();
  const onboardingFlow = useOnboardingStore((state) => state.cards);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newOnboardingScreenData = await fetchOnboardingScreenData(
          onboardingFlow
        );
        setOnboardingScreenData(newOnboardingScreenData);
      } catch (error) {
        console.error('Failed to fetch onboarding screen data:', error);
      }
    };

    fetchData();
  }, [onboardingFlow]);

  return (
    <>
      {onboardingScreenData ? (
        <OnboardingList onboardingScreenData={onboardingScreenData} />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default OnboardingScreen;
