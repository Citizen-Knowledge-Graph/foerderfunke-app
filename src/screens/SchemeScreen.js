import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScrollItem from '../components/ScrollItem';
import ScreenView from '../components/ScreenView';
import fetchHydrationData from '../controllers/hydration';
import SectionHeader from '../components/SectionHeader';

const SchemeScreen = ({route}) => {
  const [data, setData] = useState({title: '', sub_title: '', steps: []});
  const {id} = route.params;

  useEffect(() => {
    // Function to load data

    const loadData = async () => {
      // Your data loading logic here
      const hydrationData = await fetchHydrationData(id, 'QUERY');

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
        <SectionHeader title={data.title} />
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderTitle}>Image Placeholder</Text>
        </View>
      </ScrollItem>
      <ScrollItem>
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
      </ScrollItem>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  imagePlaceholder: {
    height: 150,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#B0B0B0',
    borderRadius: 5,
  },
  imagePlaceholderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  image: {
    width: '100%',
    height: 200, // Adjust height as needed
    resizeMode: 'cover',
  },
  text: {
    fontSize: 16,
  },
});

export default SchemeScreen;
