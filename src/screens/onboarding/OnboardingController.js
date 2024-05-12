import { readJson } from '../../utilities/fileManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingScreenData, OnboardingCard } from './OnboardingModel';
import { UserStore } from '../../models/user-model';

export const fetchOnboardingScreenData = async (onboardingFlow) => {
  const onboardingScreenData = new OnboardingScreenData();
  //
  // fetch onboarding cards from registry
  const onboardingRegistryPath = await AsyncStorage.getItem(
    'onboarding-registry'
  );
  const onboardingRegistry = await readJson(onboardingRegistryPath);
  const onboardingCardsPath = await AsyncStorage.getItem('onboarding-cards');
  //
  // iterate through onboarding cards
  console.log('onboardingFlow', onboardingFlow);
  for (let card of onboardingFlow) {
    const { name, index } = card;
    console.log('name', name);
    console.log('index', index);
    const newOnboardingCards = await fetchOnboardingCards(
      onboardingRegistry,
      onboardingCardsPath,
      name
    );
    onboardingScreenData.insertOnboardingCards(newOnboardingCards, index);
  }
  return onboardingScreenData;
};

export const fetchOnboardingCards = async (
  onboardingRegistry,
  onboardingCardsPath,
  name
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
    console.log('card', card);
    const newOnboardingCard = new OnboardingCard(
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
