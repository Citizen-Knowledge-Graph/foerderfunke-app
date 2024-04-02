import React from 'react';
import { View, StyleSheet } from 'react-native';

// Component
const PrimaryContainer = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export default PrimaryContainer;
