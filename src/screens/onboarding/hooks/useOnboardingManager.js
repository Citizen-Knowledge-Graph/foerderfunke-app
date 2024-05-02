import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import updateOnboardingFlow from '../../../storage/actions/updateOnboardingFlow';

function useOnboardingManager(onboardingCard, inputData, currentIndex) {
  const dispatch = useDispatch();

  return useCallback(() => {
    const { objectClass } = onboardingCard.inputConstraints;

    if (objectClass && inputData) {
      dispatch(updateOnboardingFlow(objectClass, currentIndex, inputData));
    }
  }, [onboardingCard.inputConstraints, inputData, dispatch, currentIndex]);
}

export default useOnboardingManager;
