import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ListHeader = () => {
  return <Text style={styles.listHeader}>Deine Förderungen</Text>;
};

const ListItem = ({id, item}) => {
  const navigation = useNavigation();

  const handleListItemPress = () => {
    navigation.navigate('SchemeStackScreen', {id: id});
  };

  return (
    <TouchableOpacity onPress={handleListItemPress}>
      <View style={styles.listItem}>
        <Image
          source={require('../assets/images/family_icon.png')}
          style={styles.listItemImage}
        />
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
          <Text style={styles.listItemDescription}>{item.description}</Text>
        </View>
        <Text style={styles.listItemTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FörderungenList = () => {
  const validationState = useSelector(state => state.validationReducer);
  const queriesState = useSelector(state => state.queriesReducer)[
    'query-registry'
  ];

  return (
    <View style={styles.container}>
      <ListHeader />
      {Object.keys(validationState).map(key => {
        if (validationState[key].conforms) {
          return <ListItem key={key} id={key} item={queriesState[key]} />;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 16,
    backgroundColor: '#FFF', // Or any color you want for the background of the header
  },
  listItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  listItemImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 16,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  listItemDescription: {
    fontSize: 10,
    color: '#666',
  },
  listItemTime: {
    fontSize: 8,
    color: '#666',
  },
});

export default FörderungenList;
