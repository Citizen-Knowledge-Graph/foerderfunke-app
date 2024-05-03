import { readDirectory, readJson } from './utilities/fileManagement';
import { UserStore } from './models/user-model';

export const initializeAppData = async () => {
  // user profiles
  // read all json from ./data/user-profile-examples
  const userProfilesPath = './data/user-profile-examples';
  const userProfiles = await readDirectory(userProfilesPath);
  for (const userProfile of userProfiles) {
    if (userProfile.endsWith('.json')) {
      const userProfileData = await readJson(
        `${userProfilesPath}/${userProfile}`
      );
      UserStore.storeUserData(
        userProfile.replace('.json', ''),
        userProfileData
      );
      console.log(userProfileData);
    }
  }
};
