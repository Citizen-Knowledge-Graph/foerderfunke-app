import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {parseTurtle} from '../../utilities/rdfHandling';
import {colors} from '../../assets/styles/colors';
import {fontColors, fontSizes, fontWeights} from '../../assets/styles/fonts';
import UserItem from './UserItem';
import rdf from 'rdf-ext'; // Assume rdf-ext is used for RDF operations
import {retrieveNodes} from '../../utilities/graphManagement';

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

  useEffect(() => {
    const dataset = rdf.dataset(deserializedData);
    if (deserializedData) {
      const targetNodes = retrieveNodes(dataset, 'citizen-a', 'hasBirthday');
      for (const node of targetNodes) {
        console.log('Citizen owns: ');
        console.log(node.object.value);
      }
    }
  }, [deserializedData]);

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
      <UserItem category="age" value={userData.age} variant="blue" />
      <UserItem category="residence" value={userData.residence} variant="" />
      <UserItem
        category="profession"
        value={userData.profession}
        variant="blue"
      />
      <UserItem category="married" value={userData.married} variant="" />
      <UserItem category="children" value={userData.children} variant="blue" />
      <UserItem category="company" value={userData.company} variant="" />
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
  userSection: {
    flex: 1,
  },
  nameSection: {
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 5,
  },
  email: {
    fontSize: 16,
  },
  userDataSection: {
    flex: 1,
  },
  dataSection: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 5,
  },
  dataSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dataItem: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  userData: {
    fontSize: 12,
    marginBottom: 3,
  },
});

export default UserProfile;
