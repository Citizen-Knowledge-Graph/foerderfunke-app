import { useCallback } from 'react';
import { useOnboardingStore } from '../../../storage/zustand';

function useOnboardingManager(onboardingCard, inputData, currentIndex) {
  const updateOnboardingFlow = useOnboardingStore(
    (state) => state.updateOnboardingFlow
  );

  return useCallback(() => {
    const { objectClass } = onboardingCard;

    if (objectClass && inputData) {
      updateOnboardingFlow({
        name: objectClass,
        index: currentIndex,
      });
    }
  }, [onboardingCard, inputData, updateOnboardingFlow, currentIndex]);
}

export default useOnboardingManager;
