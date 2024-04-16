import { readJson } from '../../utilities/fileManagement';

const onbardingCards = [
  {
    title: 'Tell us your first name',
    description: 'We will use this to personalize your experience',
    datafield: 'ff:hasFirstNames',
  },
  {
    title: 'Tell us your family name',
    description: 'We will use this to personalize your experience',
    datafield: 'ff:hasFamilyName',
  },
  {
    title: 'When is your birthday?',
    description: 'We will use this to personalize your experience',
    datafield: 'ff:hasBirthday',
  },
  {
    title: 'What is your gender',
    description: 'We will use this to personalize your experience',
    datafield: 'ff:hasGender',
  },
  {
    title: 'Where were you born?',
    description: 'We will use this to personalize your experience',
    datafield: 'ff:hasBirthPlace',
  },
  {
    title: 'Where do you live?',
    description: 'We will use this to personalize your experience',
    datafield: 'ff:hasResidence',
  },
  {
    title: 'What is your relationship status?',
    description: 'We will use this to personalize your experience',
    datafield: 'ff:hasMaritalStatus',
  },
];

export const fetchOnboardingScreenData = async () => {
  //const onbardingCards = await readJson('onboarding-cards.json');
  return onbardingCards;
};
