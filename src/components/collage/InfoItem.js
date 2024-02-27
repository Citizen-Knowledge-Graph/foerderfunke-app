import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const InfoItem = ({item}) => {
  const navigation = useNavigation(); // Get navigation prop

  const handleListItemPress = () => {
    navigation.navigate('GuideStackScreen', {id: 'citizen-child-allowance'});
  };

  return (
    <TouchableOpacity style={styles.infoSection} onPress={handleListItemPress}>
      <View style={styles.textContainer}>
        <Text style={styles.infoTitle}>{item.title}</Text>
        <Text style={styles.infoDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    height: 150,
    width: 175,
    backgroundColor: '#FFF',
    padding: 8,
    marginRight: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B0B0B0',
    borderRadius: 5,
  },
  textContainer: {
    alignItems: 'flex-start', // Aligns the text to the left
  },
  infoTitle: {
    fontSize: 16, // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
    marginBottom: 8, // Adds some space between the title and the description
  },
  infoDescription: {
    fontSize: 10, // Adjust the font size as needed
    color: '#666', // A light gray color for the text; replace with your desired color
  },
});

export default InfoItem;
