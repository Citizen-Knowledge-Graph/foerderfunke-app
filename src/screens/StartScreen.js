import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Main } from '../../tamagui.config';
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
        <Title color={colorTokens.dark.blue.blue5}>FörderFunke</Title>
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
