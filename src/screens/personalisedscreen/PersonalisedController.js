import { PersonalisedModel } from './PersonalisedModel';

// config
const profileSections = [
  {
    id: 'about-you',
    title: 'About you',
  },
  {
    id: 'job',
    title: 'Job',
  },
  {
    id: 'income',
    title: 'Income',
  },
  {
    id: 'education',
    title: 'Education',
  },
  {
    id: 'children',
    title: 'Children',
  },
];

export const fetchPersonalisedData = async () => {
  return new PersonalisedModel(profileSections);
};
