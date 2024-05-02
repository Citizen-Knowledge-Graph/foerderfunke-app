import AsyncStorage from '@react-native-async-storage/async-storage';
import { fileExists } from './utilities/fileManagement';

// Defined resources necessary for the app to function
const requiredResources = [
  'requirement-profiles',
  'user-profile-examples',
  'datafields',
  'materialization',
  'query-registry',
  'user-profile-hydration',
  'requirement-profile-hydration',
  'onboarding-cards',
  'onboarding-registry',
];

// Set resource locations
export const setResourceLocations = async () => {
  await AsyncStorage.setItem('requirement-profiles', 'shacl/');
  await AsyncStorage.setItem('user-profile-examples', 'user-profile-examples/');
  await AsyncStorage.setItem('datafields', 'datafields.ttl');
  await AsyncStorage.setItem('materialization', 'materialization.ttl');
  await AsyncStorage.setItem('query-registry', 'query-registry.json');
  await AsyncStorage.setItem(
    'user-profile-hydration',
    'user-profile-hydration.json'
  );
  await AsyncStorage.setItem(
    'requirement-profile-hydration',
    'requirement-profile-hydrations/'
  );
  await AsyncStorage.setItem('onboarding-registry', 'onboarding-registry.json');
  await AsyncStorage.setItem('onboarding-cards', 'onboarding-cards/');
};

// Validate the presence of all required resources
export const validateResources = async () => {
  for (const resource of requiredResources) {
    try {
      const path = await AsyncStorage.getItem(resource);
      const exists = await fileExists(path);
      if (!exists) {
        console.log(
          `File does not exist at path: ${path} (Resource: ${resource})`
        );
      } else {
        console.log(`File exists and validated for resource: ${resource}`);
      }
    } catch (error) {
      console.error(
        `Error checking file existence for resource ${resource}: ${error}`
      );
    }
  }
};
