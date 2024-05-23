import { create } from 'zustand';
import { updateUserProfile } from '../screens/profilescreen/ProfileScreenController';
import {
  addUserProfileField,
  addNestedUserProfileField,
} from '../screens/onboarding/OnboardingController';

export const useUserStore = create((set) => ({
  userId: 'kinderzuschlag-user-profile',
  updateUserId: (newUserId) => {
    console.log('STATE UPDATE: We are switching user');
    set((state) => ({ userId: newUserId }));
  },
}));

export const useMetadataStore = create((set) => ({
  metadata: {},
  updateMetadata: (newMetadata) => {
    console.log('STATE UPDATE: We are updating the metadata');
    set((state) => ({ metadata: newMetadata }));
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
  updateUserField: async (key, value) => {
    const userId = useUserStore.getState().userId;
    console.log(
      'STATE UPDATE: We are updating the user with: ',
      userId,
      key,
      value
    );
    await updateUserProfile(userId, key, value);
    set((state) => ({ updateCounter: state.updateCounter + 1 }));
  },
  addUserField: async (datafield, inputData) => {
    console.log('STATE UPDATE: We are adding a user field');
    const userId = useUserStore.getState().userId;
    await addUserProfileField(userId, datafield, inputData);
    set((state) => ({ updateCounter: state.updateCounter + 1 }));
  },
  addNestedUserProfileField: async (group, id, datafield, inputData) => {
    console.log('STATE UPDATE: We are adding a nested user field');
    const userId = useUserStore.getState().userId;
    await addNestedUserProfileField(userId, group, id, datafield, inputData);
    set((state) => ({ updateCounter: state.updateCounter + 1 }));
  },
}));

export const useOnboardingStore = create((set) => ({
  cards: [{ name: 'default', index: 0 }],
  updateOnboardingFlow: (newCards, count) => {
    console.log('STATE UPDATE: We are updating the onboarding flow');
    const newCardsArray = Array.from({ length: count }, (_, index) => ({
      ...newCards,
      id: index,
    }));
    set((state) => {
      const existingCards = state.cards.filter(
        (card) => !newCardsArray.some((newCard) => newCard.name === card.name)
      );

      return { cards: [...existingCards, ...newCardsArray] };
    });
  },
}));

export const useProfileInputSectionStore = create((set) => ({
  activeSection: 'about-you',
  updateActiveInputSection: (newProfileInputSection) => {
    console.log('STATE UPDATE: We are updating the profile input section');
    set((state) => ({ activeSection: newProfileInputSection }));
  },
}));

export const useCompletedInputSectionStore = create((set) => ({
  completedSections: [],
  updateCompletedSections: (newCompletedSections) => {
    console.log('STATE UPDATE: We are updating the completed sections');
    set((state) => ({ completedSections: newCompletedSections }));
  },
}));
