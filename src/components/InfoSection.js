import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SectionHeader = () => {
    return (
        <Text style={styles.sectionHeader}>Förderguides</Text>
    );
};

const InfoSection = () => {
    return (
        <View style={styles.container}>
            <SectionHeader />
            <View style={styles.infoSection}>
                <View style={styles.imageFrame}>
                    <Image
                        source={require('../assets/images/family_icon.png')} // Replace with your local image
                        resizeMode="contain" // or 'cover', 'stretch', etc.
                        style={styles.infoImage}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.infoTitle}>Elterngeld</Text>
                    <Text style={styles.infoDescription}>
                        He'll want to use your yacht, and I don't want this thing smelling like fish.
                    </Text>
                </View>
            </View>
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
        width: 90, // Adjust the size as needed
        height: 90, // Adjust the size as needed
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
