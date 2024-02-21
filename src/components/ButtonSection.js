import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BasicButton from './Button';

const ButtonSection = ({title}) => {
  return (
    <View style={styles.buttonContainer}>
      <BasicButton title={title} />
      <BasicButton title={title} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});

export default ButtonSection;
