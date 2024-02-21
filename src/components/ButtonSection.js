import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BasicButton from './Button';

const ButtonSection = () => {
  return (
    <View style={styles.buttonContainer}>
      <BasicButton title={'V'} />
      <BasicButton title={'U'} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});

export default ButtonSection;
