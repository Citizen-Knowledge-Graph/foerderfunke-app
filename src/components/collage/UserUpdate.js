import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Component
const UserUpdate = () => {
  const navigation = useNavigation()

  // Navigate to Edit Profile Screen
  const handleEditProfile = () => {
    navigation.navigate('UpdateProfileStackScreen'); // Replace with your actual navigation logic
  };

  return (
    <View style={styles.updateSection}>
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  updateSection: {
    flex: 1,
    backgroundColor: '#FFF', // Assuming a white background; replace with your desired color
    paddingTop: 16,
    alignItems: 'center', // This centers the content horizontally
  },
  editButton: {
    backgroundColor: '#384361', // Example button color
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default UserUpdate;
