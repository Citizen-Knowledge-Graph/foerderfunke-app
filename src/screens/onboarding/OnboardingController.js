import { readFile, readJson, writeFile } from '../../utilities/fileManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseTurtle, serializeTurtle } from '../../utilities/rdfHandling';
import { addOut } from '../../utilities/graphManagement';
import { OnboardingScreenData, OnboardingCard } from './OnboardingModel';

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
  for (let card of onboardingFlow) {
    const { name, index } = card;
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
    const newOnboardingCard = new OnboardingCard(card.datafield, card.title);
    newOnboardingCards.push(newOnboardingCard);
  }
  return newOnboardingCards;
};

export const addUserProfileField = async (
  userId,
  field,
  constraints,
  value,
  term
) => {
  //
  // fetch user profile paths
  let userProfileExamplesPath = await AsyncStorage.getItem(
    'user-profile-examples'
  );
  const userProfilePath = userProfileExamplesPath + userId + '.ttl';

  const userString = await readFile(userProfilePath);
  const userGraph = await parseTurtle(userString);
  const updatedGraph = addOut(userGraph, field, constraints, value, term);
  const updatedGraphString = await serializeTurtle(updatedGraph);
  console.log('new graph', updatedGraphString);
  await writeFile(userProfilePath, updatedGraphString);
};
