import React, { useEffect, useState } from 'react';
import ScreenView from '../../components/ScreenView';
import { fetchProfileInputData } from './ProfileInputController';
import ProfileInputList from './components/ProfileInputList';

const ProfileInputScreen = ({ route }) => {
  const { title, id } = route.params;
  const [profileInputData, setProfileInputData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newProfileInputData = await fetchProfileInputData(id);
        setProfileInputData(newProfileInputData);
      } catch (error) {
        console.error('Failed to fetch profile input screen data:', error);
      }
    };

    fetchData();
  }, [id]);

  console.log('ProfileInputScreen', profileInputData);

  return (
    <ScreenView screenName={title} backButton={true} showName={false}>
      {profileInputData && (
        <ProfileInputList title={title} profileInputData={profileInputData} />
      )}
    </ScreenView>
  );
};

export default ProfileInputScreen;
