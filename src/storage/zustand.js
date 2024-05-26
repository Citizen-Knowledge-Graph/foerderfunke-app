import { create } from 'zustand';
import { updateUserProfile } from '../screens/profilescreen/ProfileScreenController';
import { UserStore } from '../models/user-model';

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
  addNestedUserProfileField: async (group, id, datafield, inputData) => {
    console.log('STATE UPDATE: We are adding a nested user field');
    const userId = useUserStore.getState().userId;
    UserStore.setField(userId, group, id, datafield, inputData);
    set((state) => ({ updateCounter: state.updateCounter + 1 }));
  },
}));

export const useProfileInputSectionStore = create((set) => ({
  sections: [],
  initialiseSection: (id, nextId, active) => {
    console.log(
      'STATE UPDATE: We are adding a new section to the sections store'
    );
    const newSection = { id: id, next: nextId, active, completed: false };
    set((state) => ({ sections: [...state.sections, newSection] }));
  },
  updateCompletedSections: () => {
    console.log('STATE UPDATE: We are updating the completed sections');
    let nextSection;
    set((state) => ({
      sections: state.sections.map((section) => {
        if (section.active) {
          section.completed = true;
          section.active = false;
          nextSection = section.next;
        }
        if (section.id === nextSection) {
          section.active = true;
        }
        return section;
      }),
    }));
  },
}));
