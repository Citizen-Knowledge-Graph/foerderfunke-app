import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import UserProfile from '../components/UserProfile';
import ScrollItem from '../components/ScrollItem';
import UserUpdate from '../components/UserUpdate';


// Component
const ProfileScreen = ({ navigation }) => {

  // Navigate to Edit Profile Screen
  const handleEditProfile = () => {
    navigation.navigate('EditProfile'); // Replace with your actual navigation logic
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Profile" />
      <ScrollView style={styles.scrollView}>
        <ScrollItem>
          <UserProfile />
        </ScrollItem>
        <ScrollItem>
          <UserUpdate />
        </ScrollItem>
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  }
});

export default ProfileScreen;