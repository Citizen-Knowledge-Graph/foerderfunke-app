import { readJson } from '../../utilities/fileManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileInputFieldData, ProfileInputField } from './ProfileInputModel';
import { UserStore } from '../../models/user-model';

// config
export const fetchProfileInputData = async (activeSection) => {
  const profileInputData = new ProfileInputFieldData();
  //
  // fetch onboarding cards path
  const onboardingCardsPath = await AsyncStorage.getItem('onboarding-cards');
  const sectionPath = onboardingCardsPath + activeSection + '.json';
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
      card.options ? card.options : null,
      card.objectClass ? card.objectClass : null
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
