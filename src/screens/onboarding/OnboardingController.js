import { readJson } from '../../utilities/fileManagement';

export const fetchOnboardingScreenData = async () => {
  const onbardingCards = await readJson('onboarding-cards.json');
  return onbardingCards;
};
