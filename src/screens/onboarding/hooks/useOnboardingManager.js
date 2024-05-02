import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { performAdd } from '../../../storage/actions/addUserField';

function useOnboardingManager(objectClass, inputData, currentIndex) {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(performOnboardingUpdate(objectClass, inputData, currentIndex));
  }, [dispatch, objectClass, inputData, currentIndex]);
}

export default useOnboardingManager;

// could I simply go straight to the onboarding controller here
// then I would need to use the setOnboardingData function
