import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import InfoSection from '../components/InfoSection';
import FörderungenList from '../components/SupportList';

// HomeScreen Component
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar />
      <FörderungenList />
      <InfoSection />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Or any other background color for the safe area
  },
  headerContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    // shadow properties...
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {
    flex: 1, // Takes up all space below the header
    // Other styles for your scroll view
  },
  // ... other styles
});

export default HomeScreen;