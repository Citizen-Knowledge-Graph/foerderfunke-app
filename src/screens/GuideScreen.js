import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import ScrollItem from '../components/ScrollItem';
import ScreenView from '../components/ScreenView';
import fetchHydrationData from '../controllers/hydration';

const GuideScreen = ({ route }) => {
  const [data, setData] = useState({ title: '', sub_title: '', steps: [] });
  const { id } = route.params


  useEffect(() => {
    // Function to load data

    const loadData = async () => {
      // Your data loading logic here
      const hydrationData = await fetchHydrationData(id, "GUIDE");

      // make hydration available to component
      setData(hydrationData);
    };

    // Call the function to load data
    loadData();

    // The useEffect hook will run this function every time `propToWatch` changes
  }, [route]); // Dependency array

  return (
    <ScreenView screenName={data.title} backButton={true}>
      <ScrollItem>
        <View style={styles.section}>
          <Image
            source={require('../assets/images/family_icon.png')}
            style={styles.image}
          />
          <Text style={styles.text}>
            {data.sub_title}
          </Text>
        </View>
      </ScrollItem>
      <ScrollItem>
        <View style={styles.section}>
          <Text style={styles.text}>
            Zu {data.title} sollten sie folgende Dinge wissen.
          </Text>
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

export default GuideScreen;