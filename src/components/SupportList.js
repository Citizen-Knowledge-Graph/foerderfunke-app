import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import SupportListItem from './SupportListItem';

const ListHeader = () => {
  return <Text style={styles.listHeader}>Deine Förderungen</Text>;
};

const SupportList = () => {
  const validationState = useSelector(state => state.validationReducer);
  const queriesState = useSelector(state => state.queriesReducer)[
    'query-registry'
  ];

  return (
    <View style={styles.container}>
      <ListHeader />
      {Object.keys(validationState).map(key => {
        if (validationState[key].conforms) {
          return (
            <SupportListItem key={key} id={key} item={queriesState[key]} />
          );
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
    paddingBottom: 4,
    backgroundColor: '#FFF', // Or any color you want for the background of the header
  },
});

export default SupportList;
