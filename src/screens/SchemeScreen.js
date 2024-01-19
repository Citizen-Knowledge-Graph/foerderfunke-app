import React, { useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Button } from 'react-native';
import HeaderBar from '../components/HeaderBar'; // Replace with your actual import path
import ScrollItem from '../components/ScrollItem'; // Replace with your actual import path
import { useNavigation } from '@react-navigation/native';

const SchemeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button title="Back" onPress={() => navigation.goBack()} />
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <HeaderBar title="Förderleistung" />
            <ScrollView style={styles.scrollView}>
                <ScrollItem>
                    <View style={styles.section}>
                        <Image
                            source={{ uri: 'https://example.com/image.jpg' }} // Replace with your image URL
                            style={styles.image}
                        />
                        <Text style={styles.text}>Here is some explanatory text about the Förderleistung.</Text>
                    </View>
                </ScrollItem>
                <ScrollItem>
                    <View style={styles.section}>
                        <Text style={styles.text}>Short guide on how to apply for Förderleistung:</Text>
                        <Text style={styles.text}>1. Step one...</Text>
                        <Text style={styles.text}>2. Step two...</Text>
                    </View>
                </ScrollItem>
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
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
    }
});

export default SchemeScreen;
