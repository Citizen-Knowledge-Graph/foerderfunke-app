import { ProfileSectionsData, ProfileSectionStatus } from './PersonalisedModel';

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

export const fetchPersonalisedData = async (completedSections) => {
  const newProfileSectionsData = new ProfileSectionsData();
  let activeSet = false;

  profileSections.forEach((section) => {
    let activeStatus = false;

    if (!activeSet && !completedSections.includes(section.id)) {
      activeSet = true;
      activeStatus = true;
    }
    const newProfileSectionStatus = new ProfileSectionStatus(
      section.id,
      section.title,
      completedSections.includes(section.id),
      activeStatus
    );
    newProfileSectionsData.addPersonalisedData(newProfileSectionStatus);
  });

  return newProfileSectionsData;
};
