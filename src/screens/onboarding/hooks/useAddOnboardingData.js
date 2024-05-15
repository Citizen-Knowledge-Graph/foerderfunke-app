import { useCallback } from 'react';
import { useUserUpdateStore } from '../../../storage/zustand';

function useAddOnboardingData(onboardingCard, inputData) {
  const addUserField = useUserUpdateStore((state) => state.addUserField);
  const addNestedUserField = useUserUpdateStore(
    (state) => state.addNestedUserProfileField
  );

  return useCallback(() => {
    const { group, id, datafield, datatype } = onboardingCard;

    // we skip classes - they are only used to update onboarding flow
    if (datatype === 'class') {
      return;
    }

    // if group is not default, we are dealing with nested fields
    if (group !== 'default' && id !== null) {
      addNestedUserField(group, id, datafield, inputData);
      return;
    }

    // the default case
    addUserField(datafield, inputData);
  }, [onboardingCard, addUserField, addNestedUserField, inputData]);
}

export default useAddOnboardingData;
