import { readJson } from '../../utilities/fileManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  PersonalisedScreenData,
  OnboardingCard,
} from './PersonalisedScreenModel';
import { UserStore } from '../../models/user-model';

// config
const profileSections = ['about-you'];

export const fetchPersonalisedScreenData = async (onboardingFlow) => {
  const personalisedScreenData = new PersonalisedScreenData();
  //
  // fetch onboarding cards path
  const onboardingCardsPath = await AsyncStorage.getItem('onboarding-cards');
  //
  // iterate through onboarding cards
  for (let card of onboardingFlow) {
    const { name, index, id } = card;
    const newOnboardingCards = await fetchOnboardingCards(
      onboardingRegistry,
      onboardingCardsPath,
      name,
      id
    );
    onboardingScreenData.insertOnboardingCards(newOnboardingCards, index);
  }
  return onboardingScreenData;
};

export const fetchOnboardingCards = async (
  onboardingRegistry,
  onboardingCardsPath,
  name,
  id
) => {
  //
  // retrieve onboarding cards from registry
  const cardsPath = onboardingCardsPath + onboardingRegistry[name];
  const onboardingCards = await readJson(cardsPath);
  //
  // populate onboarding cards
  const newOnboardingCards = [];
  for (let card of onboardingCards) {
    //
    // create onboarding card
    const newOnboardingCard = new OnboardingCard(
      name,
      id,
      card.datafield,
      card.title,
      card.datatype,
      card.options ? card.options : null,
      card.objectClass ? card.objectClass : null
    );
    newOnboardingCards.push(newOnboardingCard);
  }
  return newOnboardingCards;
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
