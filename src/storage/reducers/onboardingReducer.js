import { UPDATE_ONBOARDING_FLOW } from '../actions/updateOnboardingFlow';

const initialState = {
  cards: [{ name: 'default', index: 0, term: 'ff:mainPerson' }],
};

const onboardingReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ONBOARDING_FLOW:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    default:
      return state;
  }
};

export default onboardingReducer;
