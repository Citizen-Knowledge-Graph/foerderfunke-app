import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import SupportListItem from './SupportListItem';
import SectionHeader from './SectionHeader';

const SupportList = () => {
  const validationState = useSelector(state => state.validationReducer);
  const queriesState = useSelector(state => state.queriesReducer)[
    'query-registry'
  ];

  return (
    <View style={styles.container}>
      <SectionHeader title={'Deine Förderungen'} />
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
});

export default SupportList;
