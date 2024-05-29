import React, { useEffect, useState } from 'react';
import ScreenView from '../../components/ScreenView';
import { fetchProfileInputData } from './ProfileInputController';
import ProfileInputList from './components/ProfileInputList';
import { useUserStore } from '../../storage/zustand';

const ProfileInputScreen = ({ route }) => {
  const { sectionData, entityData } = route.params;
  const userId = useUserStore((state) => state.userId);
  const [profileInputData, setProfileInputData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newProfileInputData = await fetchProfileInputData(
          userId,
          sectionData,
          entityData
        );
        setProfileInputData(newProfileInputData);
      } catch (error) {
        console.error('Failed to fetch profile input screen data:', error);
      }
    };

    fetchData();
  }, [entityData, sectionData]);

  console.log('ProfileInputScreen', profileInputData);

  return (
    <ScreenView
      screenName={sectionData.title}
      backButton={true}
      showName={false}
    >
      {profileInputData && (
        <ProfileInputList
          sectionsData={sectionData}
          profileInputData={profileInputData}
        />
      )}
    </ScreenView>
  );
};

export default ProfileInputScreen;
