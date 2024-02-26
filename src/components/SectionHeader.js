import React from 'react';
import {Text, StyleSheet} from 'react-native';

const SectionHeader = ({title}) => {
  return <Text style={styles.sectionHeader}>{title}</Text>;
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF', // Or any color you want for the background of the header
  },
});

export default SectionHeader;
