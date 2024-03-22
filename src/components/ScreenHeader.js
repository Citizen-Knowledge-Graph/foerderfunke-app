import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import {fontColors, fontSizes} from '../assets/styles/fonts';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

const SectionHeader = ({screenName, backButton}) => {
  const navigation = useNavigation(); // Use the useNavigation hook

  return (
    <View style={styles.sectionHeaderContainer}>
      {backButton ? (
        <View style={styles.backButton}>
          <Button
            color="#000"
            title="Back"
            onPress={() => navigation.goBack()}
          />
        </View>
      ) : null}
      <Text style={styles.sectionHeader}>{screenName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  backButton: {
    paddingRight: 16,
  },
  sectionHeader: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
  },
});

export default SectionHeader;
