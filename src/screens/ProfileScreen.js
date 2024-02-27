import React from 'react';
import ScreenView from '../components/generic/ScreenView';
import UserProfile from '../components/collage/UserProfile';
import ScrollItem from '../components/generic/PrimaryContainer';
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
