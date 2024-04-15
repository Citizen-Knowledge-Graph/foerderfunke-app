import { readJson } from '../../utilities/fileManagement';

export const fetchOnboardingScreenData = async () => {
  const onbardingCards = await readJson('onboarding-cards.json');
  console.log('onbardingCards', onbardingCards);
  return onbardingCards;
};
