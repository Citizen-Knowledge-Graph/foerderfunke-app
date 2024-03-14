import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../assets/styles/colors';
import {fontSizes, fontColors, fontWeights} from '../../assets/styles/fonts';

const ProfileListItem = ({category, value, onOpenModal}) => {
  return (
    <TouchableOpacity onPress={() => onOpenModal(true)}>
      <View style={styles.userItem}>
        <View style={styles.userItemContent}>
          <Text style={styles.userItemKey}>{category}</Text>
          <Text style={styles.userItemValue}>{value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userItemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  userItem: {
    height: 50,
    borderRadius: 5,
    marginTop: 16,
    backgroundColor: colors.beige,
  },
  userItemKey: {
    color: fontColors.secondary,
    fontWeight: fontWeights.semi_bold,
    fontSize: fontSizes.medium,
  },
  userItemValue: {
    color: fontColors.primary,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.medium,
  },
});

export default ProfileListItem;
