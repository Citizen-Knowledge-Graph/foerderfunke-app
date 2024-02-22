import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import InfoItem from './InfoItem';
import SectionHeader from './SectionHeader';

const InfoSection = () => {
  const guidesState = useSelector(state => state.guidesReducer)[
    'guides-registry'
  ];

  return (
    <View style={styles.container}>
      <SectionHeader title={'Förderguides'} />
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
});

export default InfoSection;
