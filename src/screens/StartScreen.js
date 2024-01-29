import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import TextBox from '../components/TextBox';

// Screen
const StartScreen = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => navigation.navigate('MainTabNavigator')}
      activeOpacity={0.7} // Optional: for better touch feedback
    >
      <View style={styles.container}>
        <Logo />
        <TextBox style={styles.title} text="FörderFox" />
      </View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default StartScreen;
