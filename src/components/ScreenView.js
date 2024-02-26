import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';

// Component
const ScreenView = ({children, backButton}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
});

export default ScreenView;
