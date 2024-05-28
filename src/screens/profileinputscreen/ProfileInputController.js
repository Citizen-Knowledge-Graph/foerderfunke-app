import { readJson } from '../../utilities/fileManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileInputFieldData, ProfileInputField } from './ProfileInputModel';

// config
export const fetchProfileInputData = async (sectionData, entityData) => {
  const profileInputData = new ProfileInputFieldData();
  //
  // fetch onboarding cards path
  const onboardingCardsPath = await AsyncStorage.getItem('onboarding-cards');
  const sectionPath = onboardingCardsPath + sectionData.id + '.json';
  const sectionCards = await readJson(sectionPath);
  //
  // prep some constants
  const { id, type, parentId, parentType, parentDatafield } = entityData;
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
      id,
      type,
      parentId || null,
      parentType || null,
      parentDatafield || null
    );
    profileInputData.addProfileInputField(newSectionFieldCard);
  }

  return profileInputData;
};
