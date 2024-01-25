import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Dummy user data
const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profileImageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
    age: 32,
    residence: "Berlin",
    profession: "Software Engineer",
    married: "No",
    children: 2,
    company: "FörderFox"
};

// Component
const UserProfile = () => {
    return (
        <View style={styles.userSection}>
            <Image
                source={require('../assets/images/family_icon.png')}
                style={styles.profileImage}
            />
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>
            <View style={styles.userDataSection}>
                <View style={styles.dataSection}>
                    <Text style={styles.dataSectionTitle}>Personal Data</Text>
                    <View style={styles.dataItem}>
                        <Text style={styles.userData}>Age: </Text>
                        <Text style={styles.userData}>{userData.age}</Text>
                    </View>
                    <View style={styles.dataItem}>
                        <Text style={styles.userData}>Residence: </Text>
                        <Text style={styles.userData}>{userData.residence}</Text>
                    </View>
                </View>
                <View style={styles.dataSection}>
                    <Text style={styles.dataSectionTitle}>Family</Text>
                    <View style={styles.dataItem}>
                        <Text style={styles.userData}>Married: </Text>
                        <Text style={styles.userData}>{userData.married}</Text>
                    </View>
                    <View style={styles.dataItem}>
                        <Text style={styles.userData}>Children: </Text>
                        <Text style={styles.userData}>{userData.children}</Text>
                    </View>
                </View>
                <View style={styles.dataSection}>
                    <Text style={styles.dataSectionTitle}>Professional</Text>
                    <View style={styles.dataItem}>
                        <Text style={styles.userData}>Profession: </Text>
                        <Text style={styles.userData}>{userData.profession}</Text>
                    </View>
                    <View style={styles.dataItem}>
                        <Text style={styles.userData}>Company: </Text>
                        <Text style={styles.userData}>{userData.company}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

// Style
const styles = StyleSheet.create({
    userSection: {
        flex: 1,
        backgroundColor: '#FFF', // Assuming a white background; replace with your desired color
        paddingTop: 16,
        alignItems: 'center', // This centers the content horizontally
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75, // Makes it circular
        marginBottom: 20,
        borderWidth: 2, // Width of the border
        borderColor: '#E0E0E0'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        marginBottom: 20,
    },
    userDataSection: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 16
    },
    dataSection: {
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    dataSectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    dataItem: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    userData: {
        fontSize: 12,
        marginBottom: 3,
    }
});

export default UserProfile;
