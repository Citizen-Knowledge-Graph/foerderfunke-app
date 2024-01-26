import React from 'react';
import {View, StyleSheet} from 'react-native';

// Component
const ScrollItem = ({children, style}) => {
  return <View style={[styles.scrollItem, style]}>{children}</View>;
};

// Styles
const styles = StyleSheet.create({
  scrollItem: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 3, // Defines the thickness of the top border
    borderColor: '#E0E0E0', // A light grey color for the border; replace with your desired color
  },
});

export default ScrollItem;
