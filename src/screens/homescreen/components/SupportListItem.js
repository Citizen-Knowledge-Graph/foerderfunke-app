import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../../assets/styles/colors';
import {fontSizes, fontColors, fontWeights} from '../../../assets/styles/fonts';
import {useNavigation} from '@react-navigation/native';

const SupportListItem = ({scheme}) => {
  const navigation = useNavigation();

  const handleListItemPress = () => {
    navigation.navigate('SchemeStackScreen', {scheme: scheme.key});
  };

  return (
    <TouchableOpacity onPress={handleListItemPress}>
      <View style={styles.listItem}>
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>{scheme.data.title}</Text>
          <Text style={styles.listItemDescription}>
            {scheme.data.description}
          </Text>
        </View>
        <Text style={styles.listItemTime}>{scheme.data.time}</Text>
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
