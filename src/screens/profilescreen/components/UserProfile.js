import React from 'react';
import { View } from 'react-native';

import ProfileList from './ProfileList';

// Component
const UserProfile = ({ profileScreenData }) => {
  return (
    <View>
      <ProfileList profileScreenData={profileScreenData} />
    </View>
  );
};

export default UserProfile;
