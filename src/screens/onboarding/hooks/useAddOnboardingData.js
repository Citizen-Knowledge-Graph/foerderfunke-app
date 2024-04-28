import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { performAdd } from '../../../storage/actions/addUserField';

function useAddOnboardingData(onboardingCard, inputData) {
  const dispatch = useDispatch();

  // Encapsulate the logic for submitting and navigating
  return useCallback(() => {
    dispatch(
      performAdd(
        onboardingCard.datafield,
        onboardingCard.inputConstraints,
        inputData
      )
    );
  }, [dispatch, onboardingCard, inputData]);
}

export default useAddOnboardingData;
