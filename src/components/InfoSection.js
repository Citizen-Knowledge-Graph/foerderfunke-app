import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import InfoItem from './InfoItem';

const SectionHeader = () => {
  return <Text style={styles.sectionHeader}>Förderguides</Text>;
};

const InfoSection = () => {
  const guidesState = useSelector(state => state.guidesReducer)[
    'guides-registry'
  ];

  return (
    <View style={styles.container}>
      <SectionHeader />
      <View style={styles.infoSection}>
        {Object.keys(guidesState).map(key => {
          if (guidesState[key]) {
            return <InfoItem key={key} id={key} item={guidesState[key]} />;
          }
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoSection: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'flex-start',
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 16,
    paddingBottom: 4,
    backgroundColor: '#FFF',
  },
});

export default InfoSection;
