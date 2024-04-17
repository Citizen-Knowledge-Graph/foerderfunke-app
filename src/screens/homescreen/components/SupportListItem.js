import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SizableText, Paragraph, View } from 'tamagui';

const SupportListItem = ({ scheme }) => {
  const navigation = useNavigation();

  const handleListItemPress = () => {
    navigation.navigate('SchemeStackScreen', { scheme: scheme.key, details: scheme.details });
  };

  return (
    <TouchableOpacity onPress={handleListItemPress}>
      <View style={styles.listItem}>
        <SizableText size='$5' style={styles.listItemHeader}>
          {scheme.title}
        </SizableText>
        <Paragraph size='$4' style={styles.listItemParagraph}>
          {scheme.description}
        </Paragraph>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 8,
    marginVertical: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderRadius: 0,
  },
  listItemHeader: {
    color: 'black',
    fontWeight: '500',
  },
  listItemParagraph: {
    color: 'black',
    fontWeight: '300',
  },
});

export default SupportListItem;
