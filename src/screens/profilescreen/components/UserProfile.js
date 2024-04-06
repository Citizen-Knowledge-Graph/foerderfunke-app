import React from 'react';
import { Button, View } from 'react-native';
import { shareFile } from '../ProfileScreenController';

import ProfileList from './ProfileList';
import UserSelection from './UserSelection';

const UserProfile = ({ profileScreenData }) => {
  console.log('rerendering UserProfile');
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
