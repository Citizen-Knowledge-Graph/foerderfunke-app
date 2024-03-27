import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SizableText } from 'tamagui';

const SectionHeader = ({ screenName, backButton }) => {
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
      <SizableText size="$md">{screenName}</SizableText>
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
});

export default SectionHeader;
