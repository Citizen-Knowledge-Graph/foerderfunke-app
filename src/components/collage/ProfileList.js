import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProfileListItem from './ProfileListItem';
import {retrieveAttribute} from '../../utilities/graphManagement';

const ProfileList = ({profileData}) => {
  const dataFields = [
    'hasBirthday',
    'hasResidence',
    'hasDrivingLicense',
    'hasChildren',
  ];

  return (
    <View style={styles.container}>
      {dataFields.map((field, index) => {
        const targetNodes = retrieveAttribute(profileData, 'citizen-a', field);
        const value = Array.from(targetNodes)[0].object.value;
        return <ProfileListItem key={index} category={field} value={value} />;
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

// <UserItem category="age" value={userData.age} variant="blue" />
// <UserItem category="residence" value={userData.residence} variant="" />
// <UserItem
//   category="profession"
//   value={userData.profession}
//   variant="blue"
// />
// <UserItem category="married" value={userData.married} variant="" />
// <UserItem category="children" value={userData.children} variant="blue" />
// <UserItem category="company" value={userData.company} variant="" />
