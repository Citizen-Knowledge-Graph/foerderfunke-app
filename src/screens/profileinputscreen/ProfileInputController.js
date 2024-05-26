import { readJson } from '../../utilities/fileManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileInputFieldData, ProfileInputField } from './ProfileInputModel';
import { UserStore } from '../../models/user-model';

// config
export const fetchProfileInputData = async (entityData, sectionData) => {
  const profileInputData = new ProfileInputFieldData(entityData, sectionData);
  //
  // fetch onboarding cards path
  const onboardingCardsPath = await AsyncStorage.getItem('onboarding-cards');
  const sectionPath = onboardingCardsPath + sectionData.id + '.json';
  const sectionCards = await readJson(sectionPath);
  //
  // iterate through onboarding cards
  for (let card of sectionCards) {
    //
    // create onboarding card
    const newSectionFieldCard = new ProfileInputField(
      card.datafield,
      card.title,
      card.datatype,
      card.options,
      card.objectClass,
      entityData.id,
      entityData.type
    );
    profileInputData.addProfileInputField(newSectionFieldCard);
  }

  return profileInputData;
};

export const addUserProfileField = async (userId, field, newValue) => {
  UserStore.setField(userId, field, newValue);
};

export const addNestedUserProfileField = async (
  userId,
  group,
  id,
  datafield,
  newValue
) => {
  UserStore.setNestedField(userId, group, id, datafield, newValue);
};
