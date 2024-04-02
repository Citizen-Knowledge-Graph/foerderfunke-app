import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BasicButton = ({ title }) => {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#D9D9D9',
    borderRadius: 35,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
});

export default BasicButton;
