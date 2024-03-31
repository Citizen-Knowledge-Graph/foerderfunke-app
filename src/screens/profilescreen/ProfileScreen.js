import React, { useEffect, useState } from 'react';
import ScreenView from '../../components/ScreenView';
import UserProfile from './components/UserProfile';
import { useSelector } from 'react-redux';
import { fetchProfileScreenData } from './ProfileScreenController';

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

  return (
    <ScreenView screenName={'Profile'}>
      {profileScreenData ? (
        <UserProfile profileScreenData={profileScreenData} />
      ) : null}
    </ScreenView>
  );
};

export default ProfileScreen;
