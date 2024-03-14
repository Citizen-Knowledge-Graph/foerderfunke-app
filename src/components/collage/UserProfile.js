import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {parseTurtle} from '../../utilities/rdfHandling';
import {colors} from '../../assets/styles/colors';
import {fontColors, fontSizes, fontWeights} from '../../assets/styles/fonts';
import rdf from 'rdf-ext'; // Assume rdf-ext is used for RDF operations
import {retrieveAttribute} from '../../utilities/graphManagement';

import ProfileList from './ProfileList';

// Dummy user data
const userData = {
  name: 'John',
  surname: 'Doe',
  email: 'johndoe@example.com',
  profileImageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
  age: 32,
  residence: 'Berlin',
  profession: 'Software Engineer',
  married: 'No',
  children: 2,
  company: 'FörderFunke',
};

// Component
const UserProfile = () => {
  const serializedUserData = useSelector(state => state.userReducer);
  const [deserializedData, setDeserializedData] = useState(null);

  useEffect(() => {
    const performDeserialization = async () => {
      if (serializedUserData && serializedUserData['user-profile']) {
        try {
          const data = await parseTurtle(serializedUserData['user-profile']);
          setDeserializedData(data);
        } catch (error) {
          console.error('Deserialization error:', error);
        }
      }
    };

    performDeserialization();
  }, [serializedUserData]);

  return (
    <View>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <View>
            <Text style={styles.name}>
              {userData.name} {userData.surname}
            </Text>
            <Text style={styles.surname}>{userData.email}</Text>
          </View>
        </View>
      </View>
      {deserializedData && (
        <ProfileList profileData={rdf.dataset(deserializedData)} />
      )}
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
