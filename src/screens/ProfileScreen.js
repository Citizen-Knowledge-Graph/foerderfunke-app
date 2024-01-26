import React from 'react';
import ScreenView from '../components/ScreenView';
import UserProfile from '../components/UserProfile';
import ScrollItem from '../components/ScrollItem';
import UserUpdate from '../components/UserUpdate';

// Component
const ProfileScreen = ({navigation}) => {
  // Navigate to Edit Profile Screen
  const handleEditProfile = () => {
    navigation.navigate('EditProfile'); // Replace with your actual navigation logic
  };

  return (
    <ScreenView screenName={'Profile'}>
      <ScrollItem>
        <UserProfile />
      </ScrollItem>
      <ScrollItem>
        <UserUpdate />
      </ScrollItem>
    </ScreenView>
  );
};

export default ProfileScreen;
