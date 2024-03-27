import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { H2 } from 'tamagui';

// Screen
const StartScreen = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => navigation.navigate('MainTabNavigator')}
      activeOpacity={0.7} // Optional: for better touch feedback
    >
      <View style={styles.container}>
        <H2 size="$sm">FörderFunke</H2>
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
