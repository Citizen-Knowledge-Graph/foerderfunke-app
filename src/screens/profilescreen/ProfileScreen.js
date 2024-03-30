import React, { useEffect, useState } from 'react';
import { Button, Share } from 'react-native';
import ScreenView from '../../components/ScreenView';
import UserProfile from './components/UserProfile';
import { useSelector } from 'react-redux';
import { fetchProfileScreenData } from './ProfileScreenController';
import { readFile } from '../../utilities/fileManagement';

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
    const userProfileString = await readFile(userProfilePath);
    try {
      const result = await Share.share({
        message: userProfileString,
        title: 'User profile in turtle format'
      });
    } catch (err) {
      console.error(`Error sharing the content of ${userProfilePath}`, err)
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
