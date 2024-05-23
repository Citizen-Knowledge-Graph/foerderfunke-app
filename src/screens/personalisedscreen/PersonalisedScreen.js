import React, { useState, useEffect } from 'react';
import ProfileOnboarding from './components/ProfileOnboarding';
import { fetchPersonalisedData } from './PersonalisedController';

const PersonalisedScreen = () => {
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
      <ProfileOnboarding personalisedScreenData={personalisedScreenData} />
    )
  );
};

export default PersonalisedScreen;
