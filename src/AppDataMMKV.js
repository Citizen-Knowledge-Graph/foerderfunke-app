import { readJson } from './utilities/fileManagement';
import { UserStore } from './models/user-model';

export const loadUserData = async () => {
  // initialise kinderzuschlag profile
  const profileName = 'kinderzuschlag-user-profile';
  const userProfilePath = `user-profile-examples/${profileName}.json`;
  const userProfileData = await readJson(userProfilePath);
  UserStore.storeUserData(profileName, userProfileData);
};
