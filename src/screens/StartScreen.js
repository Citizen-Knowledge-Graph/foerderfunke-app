import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import TextBox from '../components/generic/TextBox';

// Screen
const StartScreen = ({navigation}) => {
  return (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={() => navigation.navigate('MainTabNavigator')}
      activeOpacity={0.7} // Optional: for better touch feedback
    >
      <View style={styles.container}>
        <TextBox style={styles.title} text="FörderFunke" />
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
