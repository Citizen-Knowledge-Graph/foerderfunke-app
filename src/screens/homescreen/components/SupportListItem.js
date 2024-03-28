import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { fontSizes, fontColors, fontWeights } from '../../../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, Paragraph } from 'tamagui';
import { ListItem } from '../../../../tamagui.config';

const SupportListItem = ({ scheme }) => {
  const navigation = useNavigation();

  const handleListItemPress = () => {
    navigation.navigate('SchemeStackScreen', { scheme: scheme.key });
  };

  return (
    <TouchableOpacity onPress={handleListItemPress}>
      <ListItem>
        <Text>{scheme.title}</Text>
        <Paragraph>{scheme.description}</Paragraph>
      </ListItem>
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

// <Card size="$md">
//   <Card.Header padded>
//     <Text>Sony A7IV</Text>
//   </Card.Header>
// </Card>
