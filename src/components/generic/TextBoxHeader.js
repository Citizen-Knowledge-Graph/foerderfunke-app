import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {fontColors, fontSizes} from '../../assets/styles/fonts';
import SectionHeader from './SectionHeader';

// Component
const TextBoxHeader = ({title, text}) => {
  return (
    <View style={styles.container}>
      <SectionHeader title={title} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: fontColors.primary,
  },
  text: {
    fontSize: fontSizes.medium,
    color: fontColors.secondary,
  },
});

export default TextBoxHeader;
