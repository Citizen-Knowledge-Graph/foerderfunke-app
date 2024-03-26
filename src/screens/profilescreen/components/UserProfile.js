import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../../styles/colors';
import {fontColors, fontSizes, fontWeights} from '../../../styles/fonts';

import ProfileList from './ProfileList';

// Component
const UserProfile = ({profileScreenData}) => {
  return (
    <View>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <View />
        </View>
      </View>
      <ProfileList profileScreenData={profileScreenData} />
    </View>
  );
};

// Style
const styles = StyleSheet.create({
  imageContainer: {
    height: 150,
    backgroundColor: colors.dark_blue,
    padding: 16,
    borderRadius: 5,
  },
  imagePlaceholder: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
    color: fontColors.tertiary,
  },
  surname: {
    fontSize: fontSizes.medium,
    color: fontColors.quaternary,
  },
});

export default UserProfile;
