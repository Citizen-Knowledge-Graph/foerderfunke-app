// screens/MainScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../assets/styles/globalStyles';
import { fontSizes } from '../assets/styles/themes';

const MainScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={{ fontSize: fontSizes.title, color: "white" }}>FörderFuchs</Text>
    </View>
  );
};

export default MainScreen;