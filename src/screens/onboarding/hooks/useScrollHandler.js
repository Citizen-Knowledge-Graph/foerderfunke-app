import { useRef, useState } from 'react';

export const useScrollHandler = (onboardingScreenData, height) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const scrollToNext = () => {
    if (currentIndex < onboardingScreenData.onboadingCards.length) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollViewRef.current?.scrollTo({
        y: newIndex * height,
        animated: true,
      });
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollViewRef.current?.scrollTo({
        y: newIndex * height,
        animated: true,
      });
    }
  };

  const handleScroll = (event) => {
    const newY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(newY / height);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return {
    scrollViewRef,
    scrollToNext,
    scrollToPrev,
    handleScroll,
    currentIndex,
  };
};
