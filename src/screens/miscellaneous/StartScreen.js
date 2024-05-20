import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Main, Subtitle } from '../../../tamagui.config';
import { colorTokens } from '@tamagui/themes';

const StartScreen = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.removeListener;
        navigation.navigate('JourneyStackScreen');
      }}
      activeOpacity={0.7} // Optional: for better touch feedback
    >
      <Main>
        <Subtitle color={colorTokens.dark.blue.blue5}>FörderFunke</Subtitle>
      </Main>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default StartScreen;
