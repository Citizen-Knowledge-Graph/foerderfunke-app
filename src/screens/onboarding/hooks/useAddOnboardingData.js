import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { performAdd } from '../../../storage/actions/addUserField';

function useAddOnboardingData(onboardingCard, inputData) {
  const dispatch = useDispatch();

  return useCallback(() => {
    const { datafield, term, inputConstraints } = onboardingCard;

    dispatch(performAdd(datafield, inputConstraints, term, inputData));
  }, [dispatch, onboardingCard, inputData]);
}

export default useAddOnboardingData;
