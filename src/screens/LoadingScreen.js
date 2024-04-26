import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Main } from '../../tamagui.config';
import { View } from 'tamagui';
import { Loader } from '@tamagui/lucide-icons';
import Animated, {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

const LoadingScreen = () => {
  const spin = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(
      withTiming(360, { duration: 2500, easing: Easing.linear }),
      -1,
      false
    );
  }, [spin]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${spin.value}deg`,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Main>
        <Animated.View style={animatedStyle}>
          <Loader size='$3' color={'black'} />
        </Animated.View>
      </Main>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default LoadingScreen;
