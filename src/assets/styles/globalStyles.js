// globalStyles.js
import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const globalStyles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  // ... more styles
});

