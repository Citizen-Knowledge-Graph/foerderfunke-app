import React, { useState, useEffect } from 'react';
import OnboardingContext from './components/OnboardingContext';
import { fetchPersonalisedData } from './OnboardingController';

const OnboardingScreen = () => {
  const [personalisedScreenData, setPersonalisedScreenData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newPersonalisedScreenData = await fetchPersonalisedData();
        setPersonalisedScreenData(newPersonalisedScreenData);
      } catch (error) {
        console.error('Failed to fetch profile input screen data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('ProfileInputScreen', personalisedScreenData);

  return (
    personalisedScreenData && (
      <OnboardingContext personalisedScreenData={personalisedScreenData} />
    )
  );
};

export default OnboardingScreen;
