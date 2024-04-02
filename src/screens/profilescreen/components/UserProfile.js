import React from 'react';
import { Button, View } from 'react-native';
import { shareFile } from '../ProfileScreenController';

import ProfileList from './ProfileList';

// Component
const UserProfile = ({ profileScreenData }) => {
  return (
    <View>
      <ProfileList profileScreenData={profileScreenData} />
      <Button onPress={shareFile} title='Export' />
    </View>
  );
};

export default UserProfile;
