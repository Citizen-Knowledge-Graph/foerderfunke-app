import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../assets/styles/colors';
import {fontSizes, fontColors, fontWeights} from '../../assets/styles/fonts';

const UserItem = ({category, value, variant}) => {
  return (
    <View style={variant === 'blue' ? styles.userItemBlue : styles.userItem}>
      <View style={styles.userItemContent}>
        <Text
          style={
            variant === 'blue' ? styles.userItemKeyBlue : styles.userItemKey
          }>
          {category}
        </Text>
        <Text
          style={
            variant === 'blue' ? styles.userItemValueBlue : styles.userItemValue
          }>
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userItemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  userItem: {
    height: 50,
    borderRadius: 5,
    marginTop: 16,
    backgroundColor: colors.light_grey,
  },
  userItemBlue: {
    height: 50,
    borderRadius: 5,
    marginTop: 16,
    backgroundColor: colors.light_blue,
    opacity: 0.8,
  },
  userItemKey: {
    color: fontColors.secondary,
    fontWeight: fontWeights.semi_bold,
    fontSize: fontSizes.medium,
    marginRight: 32,
  },
  userItemKeyBlue: {
    color: fontColors.quaternary,
    fontWeight: fontWeights.semi_bold,
    fontSize: fontSizes.medium,
    marginRight: 32,
  },
  userItemValue: {
    color: fontColors.primary,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.medium,
  },
  userItemValueBlue: {
    color: fontColors.tertiary,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.medium,
  },
});

export default UserItem;
