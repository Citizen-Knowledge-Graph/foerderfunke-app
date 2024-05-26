import React, { useEffect, useState } from 'react';
import ScreenView from '../../components/ScreenView';
import { fetchProfileInputData } from './ProfileInputController';
import ProfileInputList from './components/ProfileInputList';

const ProfileInputScreen = ({ route }) => {
  const { sectionData, entityData } = route.params;
  const [profileInputData, setProfileInputData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newProfileInputData = await fetchProfileInputData(
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
          title={sectionData.title}
          id={sectionData.id}
          profileInputData={profileInputData}
        />
      )}
    </ScreenView>
  );
};

export default ProfileInputScreen;
