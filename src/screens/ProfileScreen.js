import React from 'react';
import ScreenView from '../components/generic/ScreenView';
import UserProfile from '../components/collage/UserProfile';
import UserUpdate from '../components/collage/UserUpdate';
import {useNavigation} from '@react-navigation/native';

// Component
const ProfileScreen = () => {
  const navigation = useNavigation();

  // Navigate to Edit Profile Screen
  const handleEditProfile = () => {
    navigation.navigate('EditProfile'); // Replace with your actual navigation logic
  };

  return (
    <ScreenView screenName={'Profile'}>
      <UserProfile />
      <UserUpdate />
    </ScreenView>
  );
};

export default ProfileScreen;
