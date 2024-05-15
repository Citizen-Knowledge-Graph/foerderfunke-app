import { useCallback } from 'react';
import { useOnboardingStore } from '../../../storage/zustand';

function useOnboardingManager(onboardingCard, inputData, currentIndex) {
  const updateOnboardingFlow = useOnboardingStore(
    (state) => state.updateOnboardingFlow
  );

  return useCallback(() => {
    const { datatype, datafield } = onboardingCard;

    if (datatype === 'class') {
      updateOnboardingFlow(
        {
          name: datafield,
          index: currentIndex,
        },
        inputData
      );
    }
  }, [onboardingCard, inputData, updateOnboardingFlow, currentIndex]);
}

export default useOnboardingManager;
