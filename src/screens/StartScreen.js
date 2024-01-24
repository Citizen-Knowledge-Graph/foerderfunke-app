import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import TextBox from '../components/TextBox';
import { colors } from '../assets/styles/themes';

// Screen
const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <TextBox style={styles.title} text="FörderFuchs" />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});

export default MainScreen;