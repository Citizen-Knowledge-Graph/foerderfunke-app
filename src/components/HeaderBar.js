import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { fontSizes } from '../assets/styles/themes';

const HeaderBar = ({ title }) => {
    return (
        <View style={styles.headerContainer}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        //elevation: 5, 
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default HeaderBar;