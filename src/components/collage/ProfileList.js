import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProfileListItem from './ProfileListItem';
import {retrieveAttribute} from '../../utilities/graphManagement';

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
        const targetNodes = retrieveAttribute(
          profileData,
          'citizen-a',
          field[0],
        );
        const value = Array.from(targetNodes)[0].object.value;
        return (
          <ProfileListItem key={index} category={field[1]} value={value} />
        );
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
