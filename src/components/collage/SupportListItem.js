import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../assets/styles/colors';
import {fontSizes, fontColors, fontWeights} from '../../assets/styles/fonts';

const SupportListItem = ({item}) => {
  return (
    <TouchableOpacity>
      <View style={styles.listItem}>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    height: 125,
    padding: 16,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: colors.light_blue,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
    color: fontColors.tertiary,
  },
  listItemDescription: {
    fontSize: fontSizes.medium,
    color: fontColors.quaternary,
    fontWeight: fontWeights.semi_bold,
  },
});

export default SupportListItem;

// <View style={styles.listItemContent}>
//   <Text style={styles.listItemTitle}>{item.title}</Text>
//   <Text style={styles.listItemDescription}>{item.description}</Text>
// </View>
// <Text style={styles.listItemTime}>{item.time}</Text>
