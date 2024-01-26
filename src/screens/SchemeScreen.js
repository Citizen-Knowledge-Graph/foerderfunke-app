import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import ScrollItem from '../components/ScrollItem';
import ScreenView from '../components/ScreenView';

const SchemeScreen = () => {
  return (
    <ScreenView screenName={'Förderleistung'} backButton={true}>
      <ScrollItem>
        <View style={styles.section}>
          <Image
            source={{uri: 'https://example.com/image.jpg'}} // Replace with your image URL
            style={styles.image}
          />
          <Text style={styles.text}>
            Here is some explanatory text about the Förderleistung.
          </Text>
        </View>
      </ScrollItem>
      <ScrollItem>
        <View style={styles.section}>
          <Text style={styles.text}>
            Short guide on how to apply for Förderleistung:
          </Text>
          <Text style={styles.text}>1. Step one...</Text>
          <Text style={styles.text}>2. Step two...</Text>
        </View>
      </ScrollItem>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 200, // Adjust height as needed
    resizeMode: 'cover',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default SchemeScreen;
