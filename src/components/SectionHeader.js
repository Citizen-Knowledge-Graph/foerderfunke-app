import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {fontSizes, fontWeights} from '../styles/fonts';

const SectionHeader = ({title}) => {
  return <Text style={styles.sectionHeader}>{title}</Text>;
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
    paddingBottom: 8,
  },
});

export default SectionHeader;
