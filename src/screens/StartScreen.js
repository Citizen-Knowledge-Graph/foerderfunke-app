import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Main, Subtitle } from '../../tamagui.config';
import { colorTokens } from '@tamagui/themes';

// Screen
const StartScreen = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => navigation.navigate('MainTabNavigator')}
      activeOpacity={0.7} // Optional: for better touch feedback
    >
      <Main>
        <Subtitle color={colorTokens.dark.blue.blue5}>FörderFunke</Subtitle>
      </Main>
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
