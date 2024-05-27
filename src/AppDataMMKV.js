import { readJson } from './utilities/fileManagement';
import { UserStore } from './models/user-model';

export const loadUserData = async () => {
  // initialise kinderzuschlag profile
  const profilePath = 'kinderzuschlag-user-profile';
  const userProfilePath = `user-profile-examples/${profilePath}.json`;
  const userProfileData = await readJson(userProfilePath);
  UserStore.storeUserData(userProfileData['@id'], userProfileData);
};
