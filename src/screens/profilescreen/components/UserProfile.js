import React from 'react';
import { Button, View } from 'react-native';
import { shareFile } from '../ProfileScreenController';

import ProfileList from './ProfileList';
import UserSelection from './UserSelection';

// Component
const UserProfile = ({ profileScreenData }) => {
  return (
    <View>
      <ProfileList profileScreenData={profileScreenData} />
      <UserSelection
        alternativeUserProfiles={profileScreenData.alternativeUserProfiles}
      />
      <Button onPress={shareFile} title='Export' />
    </View>
  );
};

export default UserProfile;
