import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import ScreenView from '../../components/ScreenView';
import UserProfile from './components/UserProfile';
import { useSelector } from 'react-redux';
import { fetchProfileScreenData } from './ProfileScreenController';
import Share from 'react-native-share';
import * as FileSystem from 'expo-file-system';

// Component
const ProfileScreen = () => {
  const [profileScreenData, setProfileScreenData] = useState(null);
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newProfileScreenData = await fetchProfileScreenData();
        setProfileScreenData(newProfileScreenData);
      } catch (error) {
        console.error('Failed to fetch home screen data:', error);
      }
    };

    fetchData();
  }, [userState]);

  const shareFile = async () => {
    const userProfilePath = 'user-profile.ttl';
    const absoluteFilePath = FileSystem.documentDirectory + userProfilePath;
    const shareOptions = {
      url: `file://${absoluteFilePath}`,
      type: 'text/turtle',
    };
    try {
      await Share.open(shareOptions)
        .then((res) => console.log('Share was successful', res))
        .catch((err) => console.log('Error sharing the file', err));
    } catch (error) {
      console.error(`Error accessing file: ${absoluteFilePath}`, error);
    }
  };

  return (
    <ScreenView screenName={'Profile'}>
      {profileScreenData ? (
        <UserProfile profileScreenData={profileScreenData} />
      ) : null}
      <Button onPress={shareFile} title='Export' />
    </ScreenView>
  );
};

export default ProfileScreen;
