import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {parseTurtle} from '../../utilities/rdfHandling';
import SectionHeader from '../generic/SectionHeader';

// Dummy user data
const userData = {
  name: 'John Doe',
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
    <View style={styles.container}>
      <SectionHeader title={'Dein Profil'} />
      <View style={styles.nameSection}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>
      <View style={styles.userDataSection}>
        <View style={styles.dataSection}>
          <Text style={styles.dataSectionTitle}>Personal Data</Text>
          <View style={styles.dataItem}>
            <Text style={styles.userData}>Age: </Text>
            <Text style={styles.userData}>{userData.age}</Text>
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.userData}>Residence: </Text>
            <Text style={styles.userData}>{userData.residence}</Text>
          </View>
        </View>
        <View style={styles.dataSection}>
          <Text style={styles.dataSectionTitle}>Family</Text>
          <View style={styles.dataItem}>
            <Text style={styles.userData}>Married: </Text>
            <Text style={styles.userData}>{userData.married}</Text>
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.userData}>Children: </Text>
            <Text style={styles.userData}>{userData.children}</Text>
          </View>
        </View>
        <View style={styles.dataSection}>
          <Text style={styles.dataSectionTitle}>Professional</Text>
          <View style={styles.dataItem}>
            <Text style={styles.userData}>Profession: </Text>
            <Text style={styles.userData}>{userData.profession}</Text>
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.userData}>Company: </Text>
            <Text>Deserialized Data:</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Style
const styles = StyleSheet.create({
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
  name: {
    fontSize: 20,
    fontWeight: 'bold',
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
