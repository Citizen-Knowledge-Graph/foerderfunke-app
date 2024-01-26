import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import HeaderBar from '../components/HeaderBar';

// Component
const ScreenView = ({screenName, children, backButton}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title={screenName} backButton={backButton} />
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
