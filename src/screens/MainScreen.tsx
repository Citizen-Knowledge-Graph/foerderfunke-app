// screens/MainScreen.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles } from '../assets/styles/globalStyles';
import { fontSizes } from '../assets/styles/themes';

const MainScreen = () => {
	const navigation = useNavigation();

  return (
    <TouchableOpacity 
			style={globalStyles.primaryContainer}
			onPress={() => navigation.navigate("Second")}
		>
      <Text style={{ fontSize: fontSizes.title, color: "white" }}>FörderFuchs</Text>
    </TouchableOpacity>
  );
};

export default MainScreen;