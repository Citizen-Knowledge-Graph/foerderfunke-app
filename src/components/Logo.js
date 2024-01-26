import React from 'react';
import {Image} from 'react-native';
import {StyleSheet} from 'react-native';

// Styles
const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
});

// Component
const Logo = () => {
  return (
    <Image source={require('../assets/images/logo.jpg')} style={styles.logo} />
  );
};

export default Logo;
