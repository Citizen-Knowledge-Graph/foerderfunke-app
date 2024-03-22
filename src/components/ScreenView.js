import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import ScreenHeader from './ScreenHeader';
import {colors} from '../assets/styles/colors';
import PrimaryContainer from './PrimaryContainer';

// Component
const ScreenView = ({screenName, children, backButton}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader screenName={screenName} backButton={backButton} />
      <ScrollView style={styles.scrollView}>
        <PrimaryContainer>{children}</PrimaryContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
});

export default ScreenView;
