import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const SectionHeader = () => {
  return <Text style={styles.sectionHeader}>Förderguides</Text>;
};

const InfoSection = () => {
  const navigation = useNavigation(); // Get navigation prop
  const guidesState = useSelector(state => state.guidesReducer)[
    'guides-registry'
  ]
  const currentGuide = guidesState["citizen-child-allowance"]

  const handleListItemPress = () => {
    navigation.navigate('GuideStackScreen', { id: "citizen-child-allowance" });
  };

  return (
    <View style={styles.container}>
      <SectionHeader />
      <TouchableOpacity
        style={styles.infoSection}
        onPress={handleListItemPress}
      >
        <View style={styles.imageFrame}>
          <Image
            source={require('../assets/images/family_icon.png')}
            resizeMode="contain"
            style={styles.infoImage}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>{currentGuide.title}</Text>
          <Text style={styles.infoDescription}>
            {currentGuide.description}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoSection: {
    flex: 1,
    backgroundColor: '#FFF', // Assuming a white background; replace with your desired color
    paddingTop: 16,
    alignItems: 'center', // This centers the content horizontally
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 16,
    backgroundColor: '#FFF', // Or any color you want for the background of the header
  },
  imageFrame: {
    borderWidth: 15, // Width of the blue frame around the image
    borderColor: 'rgba(235, 235, 235, 1)', // 50% opacity blue frame
    width: '100%', // Makes the frame take the full width of the container
    alignItems: 'center', // Centers the image horizontally
    marginBottom: 12,
  },
  infoImage: {
    width: 120, // Adjust the size as needed
    height: 120, // Adjust the size as needed
  },
  textContainer: {
    alignItems: 'flex-start', // Aligns the text to the left
  },
  infoTitle: {
    fontSize: 12, // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
    marginBottom: 8, // Adds some space between the title and the description
  },
  infoDescription: {
    fontSize: 10, // Adjust the font size as needed
    color: '#666', // A light gray color for the text; replace with your desired color
  },
});

export default InfoSection;
