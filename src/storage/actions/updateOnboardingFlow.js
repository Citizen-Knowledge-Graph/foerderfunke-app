// action types
export const UPDATE_ONBOARDING_FLOW = 'UPDATE_ONBOARDING_FLOW';

// action creator
const updateOnboardingFlow = (name, index) => {
  return {
    type: UPDATE_ONBOARDING_FLOW,
    payload: { name: name, index: index },
  };
};

export default updateOnboardingFlow;
