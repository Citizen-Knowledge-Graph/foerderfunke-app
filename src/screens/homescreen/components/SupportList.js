import React from 'react';
import SupportListItem from './SupportListItem';
import { StyleSheet, View } from 'react-native';
import { SizableText } from 'tamagui';
import { colorTokens } from '@tamagui/themes';

const SupportList = ({ homeScreenData }) => {
  console.log('rerendering SupportList');
  return (
    <View>
      {homeScreenData.eligible.map((scheme, index) => (
        <SupportListItem key={index} scheme={scheme} />
      ))}
      <View style={styles.potentiallyEligibleHeader}>
        <SizableText size='$7' color={'black'} fontWeight={'600'}>
          Möglicherweise verfügbare Förderungen
        </SizableText>
      </View>
      <View>
        <SizableText size='$5' color={'blue'} fontWeight={'300'}>
          Fehlende Datenpunkte
        </SizableText>
        {Object.keys(homeScreenData.missingUserInputsAggregated).map((key) => (
          <SizableText size='$4' color={'gray'} fontWeight={'300'}>
            - {homeScreenData.missingUserInputsAggregated[key].predicate.split('#')[1]}
          </SizableText>
        ))}
      </View>
      {homeScreenData.missingData.map((scheme, index) => (
        <SupportListItem key={index} scheme={scheme} />
      ))}
      <View style={styles.nonEligibleHeader}>
        <SizableText size='$7' color={'black'} fontWeight={'600'}>
          Nicht verfügbare Förderungen
        </SizableText>
      </View>
      {homeScreenData.nonEligible.map((scheme, index) => (
        <SupportListItem key={index} scheme={scheme} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  nonEligibleHeader: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: colorTokens.light.red.red6,
  },
  potentiallyEligibleHeader: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: colorTokens.light.purple.purple6,
  },
});

export default SupportList;
