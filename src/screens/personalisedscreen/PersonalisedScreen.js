import React, { useState, useEffect } from 'react';
import ProfileOnboarding from './components/ProfileOnboarding';
import { fetchPersonalisedData } from './PersonalisedController';
import { useProfileInputSectionStore } from '../../storage/zustand';

const PersonalisedScreen = () => {
  const [personalisedScreenData, setPersonalisedScreenData] = useState();
  const completedSections = useProfileInputSectionStore(
    (state) => state.completedSections
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newPersonalisedScreenData = await fetchPersonalisedData(
          completedSections
        );
        setPersonalisedScreenData(newPersonalisedScreenData);
      } catch (error) {
        console.error('Failed to fetch profile input screen data:', error);
      }
    };

    fetchData();
  }, [completedSections]);

  console.log('ProfileInputScreen', personalisedScreenData);

  return (
    personalisedScreenData && (
      <ProfileOnboarding personalisedScreenData={personalisedScreenData} />
    )
  );
};

export default PersonalisedScreen;
