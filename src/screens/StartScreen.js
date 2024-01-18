import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import TextBox from '../components/TextBox';
import { colors } from '../assets/styles/themes';

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainBackground,
  },
});

// Screen
const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <TextBox text="FörderFuchs" />
    </View>
  );
};

export default MainScreen;