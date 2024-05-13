import React, { forwardRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PrimaryContainer from '../../../components/PrimaryContainer';

const FullScreenView = forwardRef(({ children, handleScroll }, ref) => {
  return (
    <ScrollView
      ref={ref}
      style={styles.scrollView}
      pagingEnabled={true}
      onMomentumScrollEnd={handleScroll}
      scrollIndicatorInsets={{ right: 1 }}
    >
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
