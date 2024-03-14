import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProfileListItem from './ProfileListItem';
import {getFirstAttributeValue} from '../../utilities/graphManagement';

const ProfileList = ({profileData}) => {
  const dataFields = [
    ['hasBirthday', 'Birthday'],
    ['hasResidence', 'Residence'],
    ['hasDrivingLicense', 'Driving License'],
    ['hasChildren', 'Children'],
  ];

  return (
    <View style={styles.container}>
      {dataFields.map((field, index) => {
        const value = getFirstAttributeValue(
          profileData,
          'citizen-a',
          field[0],
        );
        return value !== undefined ? (
          <ProfileListItem key={index} category={field[1]} value={value} />
        ) : null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileList;
