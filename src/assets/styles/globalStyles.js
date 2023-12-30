// globalStyles.js
import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const globalStyles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  secondaryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
});

