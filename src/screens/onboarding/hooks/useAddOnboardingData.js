import { useCallback } from 'react';
import { useUserUpdateStore } from '../../../storage/zustand';

function useAddOnboardingData(onboardingCard, inputData) {
  const addUserField = useUserUpdateStore((state) => state.addUserField);

  return useCallback(() => {
    const { datafield, term, inputConstraints } = onboardingCard;

    addUserField(datafield, inputConstraints, term, inputData);
  }, [onboardingCard, addUserField, inputData]);
}

export default useAddOnboardingData;
