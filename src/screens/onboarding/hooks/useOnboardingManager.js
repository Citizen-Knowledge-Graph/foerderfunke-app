import { useCallback } from 'react';
import { useOnboardingStore } from '../../../storage/zustand';

function useOnboardingManager(onboardingCard, inputData, currentIndex) {
  const updateOnboardingFlow = useOnboardingStore(
    (state) => state.updateOnboardingFlow
  );

  return useCallback(() => {
    const { objectClass } = onboardingCard.inputConstraints;

    if (objectClass && inputData) {
      updateOnboardingFlow({
        name: objectClass,
        index: currentIndex,
        term: inputData,
      });
    }
  }, [
    onboardingCard.inputConstraints,
    inputData,
    updateOnboardingFlow,
    currentIndex,
  ]);
}

export default useOnboardingManager;
