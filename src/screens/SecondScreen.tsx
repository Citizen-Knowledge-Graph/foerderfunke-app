import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { globalStyles } from '../assets/styles/globalStyles';
import { fontSizes } from '../assets/styles/themes';

const SecondScreen = () => {
  return (
    <View style={globalStyles.secondaryContainer}>
        <Text style={{ fontSize: fontSizes.title, color: "black" }}>Second Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // or any color you prefer
  },
  text: {
    fontSize: 20,
    color: '#000', // or any color you prefer
  },
});

export default SecondScreen;