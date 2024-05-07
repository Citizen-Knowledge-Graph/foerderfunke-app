import { create } from 'zustand';
import { updateUserProfile } from '../screens/profilescreen/ProfileScreenController';
import { addUserProfileField } from '../screens/onboarding/OnboardingController';

export const useUserStore = create((set) => ({
  userId: 'kinderzuschlag-user-profile',
  updateUserId: (newUserId) => {
    console.log('STATE UPDATE: We are switching user');
    set((state) => ({ userId: newUserId }));
  },
}));

export const useValidationReportStore = create((set) => ({
  validationReport: {},
  updateValidationReport: (newValidationReport) => {
    console.log('STATE UPDATE: We are updating the validation report');
    set((state) => ({ validationReport: newValidationReport }));
  },
}));

export const useUserUpdateStore = create((set) => ({
  updateCounter: 0,
  updateUserField: async (key, object, inputText) => {
    console.log('STATE UPDATE: We are updating the user update');
    const userId = useUserStore.getState().userId;
    await updateUserProfile(userId, key, object, inputText);
    set((state) => ({ updateCounter: state.updateCounter + 1 }));
  },
  addUserField: async (datafield, inputConstraints, inputData, term) => {
    console.log('STATE UPDATE: We are adding a user field');
    const userId = useUserStore.getState().userId;
    await addUserProfileField(
      userId,
      datafield,
      inputConstraints,
      inputData,
      term
    );
    set((state) => ({ updateCounter: state.updateCounter + 1 }));
  },
}));

export const useOnboardingStore = create((set) => ({
  cards: [{ name: 'default', index: 0, term: 'ff:mainPerson' }],
  updateOnboardingFlow: (newCards) => {
    console.log('STATE UPDATE: We are updating the onboarding flow');
    set((state) => ({ cards: state.cards.push(newCards) }));
  },
}));