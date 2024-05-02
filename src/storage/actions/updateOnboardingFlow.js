// action types
export const UPDATE_ONBOARDING_FLOW = 'UPDATE_ONBOARDING_FLOW';

// action creator
const updateOnboardingFlow = (name, index, term) => {
  return {
    type: UPDATE_ONBOARDING_FLOW,
    payload: { name: name, index: index, term: term },
  };
};

export default updateOnboardingFlow;
