import { create } from 'zustand';
import { updateUserProfile } from '../screens/profilescreen/ProfileScreenController';

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
  addUserField: async (entityId, entityType, datafield, inputData) => {
    console.log('STATE UPDATE: We are adding a user field');
    await (entityId, entityType, datafield, inputData);
    set((state) => ({ updateCounter: state.updateCounter + 1 }));
  },
}));

export const useProfileInputSectionStore = create((set) => ({
  activeSection: 'about-you',
  sections: [],
  resetSectionStore: () => {
    console.log('STATE UPDATE: We are resetting the section store');
    set((state) => ({ activeSection: 'about-you', sections: [] }));
  },
  initialiseSection: (id, nextId) => {
    console.log(
      'STATE UPDATE: We are adding a new section to the sections store'
    );
    const newSection = { id: id, next: nextId, completed: false };
    set((state) => ({ sections: [...state.sections, newSection] }));
  },
  updateCompletedSections: (id) => {
    console.log('STATE UPDATE: We are updating the completed sections');
    let nextSection;
    set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id === id) {
          section.completed = true;
          nextSection = section.next;
        }
        return section;
      }),
      activeSection: nextSection,
    }));
  },
}));
