import React, { useState, useEffect } from 'react';
import OnboardingContext from './components/OnboardingContext';
import { fetchPersonalisedData } from './OnboardingController';
import { useUserStore } from '../../storage/zustand';

const OnboardingScreen = () => {
  const [personalisedScreenData, setPersonalisedScreenData] = useState();
  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newPersonalisedScreenData = await fetchPersonalisedData(userId);
        setPersonalisedScreenData(newPersonalisedScreenData);
      } catch (error) {
        console.error('Failed to fetch profile input screen data:', error);
      }
    };

    fetchData();
  }, [userId]);

  console.log('Onboarding', personalisedScreenData);

  return (
    personalisedScreenData && (
      <OnboardingContext personalisedScreenData={personalisedScreenData} />
    )
  );
};

export default OnboardingScreen;
