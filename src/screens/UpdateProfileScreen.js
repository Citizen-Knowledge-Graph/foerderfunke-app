import React from 'react';
import ScreenView from '../components/ScreenView';
import UserProfile from '../components/UserProfile';
import ScrollItem from '../components/ScrollItem';
import UserUpdate from '../components/UserUpdate';
import { useNavigation } from '@react-navigation/native';

// Component
const UpdateProfileScreen = () => {
  const navigation = useNavigation()

  // Navigate to Edit Profile Screen
  const handleEditProfile = () => {
    navigation.navigate('UpdateProfileScreen'); // Replace with your actual navigation logic
  };

  return (
    <ScreenView screenName={'Update Profile'} backButton={true}>
      <ScrollItem>
        <UserProfile />
      </ScrollItem>
      <ScrollItem>
        <UserUpdate />
      </ScrollItem>
    </ScreenView>
  );
};

export default UpdateProfileScreen;
