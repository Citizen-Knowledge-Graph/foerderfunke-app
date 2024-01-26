import React from 'react';
import {View, Text, StyleSheet, StatusBar, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HeaderBar = ({title, backButton}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="dark-content" />
      {backButton ? (
        <Button title="Back" onPress={() => navigation.goBack()} />
      ) : (
        <View style={styles.placeholderButton} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.placeholderButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row', // Align children in a row
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  backButton: {},
  placeholderButton: {
    width: 50,
  },
});

export default HeaderBar;
