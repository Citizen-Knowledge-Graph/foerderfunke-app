import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {fontSizes} from '../../assets/styles/fonts';

// Styles
const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: '#384361',
  },
});

// Component
const TextBox = ({text}) => {
  return (
    <View>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

export default TextBox;
