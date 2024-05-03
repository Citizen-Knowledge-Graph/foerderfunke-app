import React, { useEffect, useState } from 'react';
import ScreenView from '../../components/ScreenView';
import UserProfile from './components/UserProfile';
import { fetchProfileScreenData } from './ProfileScreenController';
import { useUserStore, useUserUpdateStore } from '../../storage/zustand';

// Component
const ProfileScreen = () => {
  const [profileScreenData, setProfileScreenData] = useState(null);
  const userId = useUserStore((state) => state.userId);
  const userUpdate = useUserUpdateStore((state) => state.updateCounter);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newProfileScreenData = await fetchProfileScreenData(userId);
        setProfileScreenData(newProfileScreenData);
      } catch (error) {
        console.error('Failed to fetch home screen data:', error);
      }
    };

    fetchData();
  }, [userId, userUpdate]);

  return (
    <ScreenView screenName={'Profile'}>
      {profileScreenData ? (
        <UserProfile profileScreenData={profileScreenData} />
      ) : null}
    </ScreenView>
  );
};

export default ProfileScreen;
