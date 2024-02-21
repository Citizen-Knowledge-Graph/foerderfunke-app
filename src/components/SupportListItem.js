import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const SupportListItem = ({id, item}) => {
  const navigation = useNavigation();

  const handleListItemPress = () => {
    navigation.navigate('SchemeStackScreen', {id: id});
  };

  return (
    <TouchableOpacity onPress={handleListItemPress}>
      <View style={styles.listItem}>
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
          <Text style={styles.listItemDescription}>{item.description}</Text>
        </View>
        <Text style={styles.listItemTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    height: 100,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B0B0B0',
    borderRadius: 5,
    marginVertical: 2,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItemDescription: {
    fontSize: 12,
    color: '#666',
  },
  listItemTime: {
    fontSize: 8,
    color: '#666',
  },
});

export default SupportListItem;
