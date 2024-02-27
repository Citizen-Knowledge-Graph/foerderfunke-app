import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SectionHeader from '../generic/SectionHeader';
import {colors} from '../../assets/styles/colors';
import {fontColors, fontSizes, fontWeights} from '../../assets/styles/fonts';

const SchemeInfo = ({data}) => {
  return (
    <View>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderTitle}>Image Placeholder</Text>
      </View>
      <SectionHeader title={'Was sieht die Förderung aus?'} />
      <View style={styles.section}>
        <Text style={styles.text}>{data.description_long}</Text>
      </View>
      <SectionHeader title={'Beantragung'} />
      <View style={styles.section}>
        <Text style={styles.text}>
          {data.title} können Sie folgendermaßen beantragen.
        </Text>
        {data.steps.map((step, index) => (
          <Text key={index} style={styles.text}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePlaceholder: {
    height: 200,
    backgroundColor: colors.red,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 5,
  },
  imagePlaceholderTitle: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
    color: fontColors.tertiary,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#B0B0B0',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default SchemeInfo;
