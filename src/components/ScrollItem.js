import React from 'react';
import {View, StyleSheet} from 'react-native';

// Component
const ScrollItem = ({children, style}) => {
  return <View style={[styles.scrollItem, style]}>{children}</View>;
};

// Styles
const styles = StyleSheet.create({
  scrollItem: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderColor: '#E0E0E0', // A light grey color for the border; replace with your desired color
  },
});

export default ScrollItem;
