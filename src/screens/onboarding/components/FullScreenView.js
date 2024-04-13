import React, { forwardRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PrimaryContainer from '../../../components/PrimaryContainer';

// Component
const FullScreenView = forwardRef(({ children }, ref) => {
  return (
    <ScrollView ref={ref} style={styles.scrollView} pagingEnabled={true}>
      <PrimaryContainer>{children}</PrimaryContainer>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default FullScreenView;
