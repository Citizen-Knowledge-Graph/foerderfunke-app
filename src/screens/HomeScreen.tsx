import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import InfoSection from '../components/InfoSection';
import FörderungenList from '../components/SupportList';

// Component
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar />
      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollItem}>
          <InfoSection />
        </View>
        <View style={styles.scrollItem}>
          <FörderungenList />
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

// Styles
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  deineFörderungenSection: {
    // Additional styles if needed
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollItem: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 3, // Defines the thickness of the top border
    borderColor: '#E0E0E0', // A light grey color for the border; replace with your desired color
  }
});

export default HomeScreen;