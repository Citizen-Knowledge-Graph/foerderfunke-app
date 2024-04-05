import { readFile, readJson, writeFile } from '../../utilities/fileManagement';
import { parseTurtle, serializeTurtle } from '../../utilities/rdfHandling';
import { getFirstOut, updateOut } from '../../utilities/graphManagement';
import { ProfileDataField, ProfileScreenData } from './ProfileScreenModel';
import { Share } from 'react-native';

// config
const dataFields = [
  'name',
  'surname',
  'birthday',
  'residence',
  'drivers_license',
];

export const fetchProfileScreenData = async (selectedUser) => {
  let profileScreenData = new ProfileScreenData();
  //
  // fetch content information for each data field
  const userHydrationPath = 'user-profile-hydration.json';
  const userHydrationJson = await readJson(userHydrationPath);
  dataFields.map((key) => {
    const newDataField = new ProfileDataField(key);
    newDataField.setDisplayName(userHydrationJson[key].display_name);
    newDataField.setName(userHydrationJson[key].name);
    newDataField.setNamespace(userHydrationJson[key].namespace);
    profileScreenData.addProfileDataField(newDataField);
  });
  //
  // fetch user profile paths
  const userRegistryPath = 'user-registry.json';
  const userRegistry = await readJson(userRegistryPath);
  const userProfilePath = userRegistry[selectedUser.userId].path;
  //
  // fetch user data from the user profile
  const userString = await readFile(userProfilePath);
  const userGraph = await parseTurtle(userString);
  profileScreenData.profileData.forEach((entry) => {
    entry.setObject(getFirstOut(userGraph, entry.name, entry.namespace));
  });
  //
  // fetch user profile meta data
  const alternativeUserProfilesPath = 'user-registry.json';
  const alternativeUserProfilesJson = await readJson(
    alternativeUserProfilesPath
  );
  Object.keys(alternativeUserProfilesJson).map((key, value) => {
    profileScreenData.addAlternativeUserProfile(key);
  });
  return profileScreenData;
};

export const updateUserProfile = async (selectedUser, entry, updateValue) => {
  //
  // fetch user profile paths
  const userRegistryPath = 'user-registry.json';
  const userRegistry = await readJson(userRegistryPath);
  const userProfilePath = userRegistry[selectedUser.userId].path;

  const userString = await readFile(userProfilePath);
  const userGraph = await parseTurtle(userString);
  const updatedGraph = updateOut(
    'replace',
    userGraph,
    entry.name,
    entry.namespace,
    entry.object,
    updateValue
  );
  const updatedGraphString = await serializeTurtle(updatedGraph);
  await writeFile(userProfilePath, updatedGraphString);
};

export const shareFile = async () => {
  const userProfilePath = 'user-profile.ttl';
  const userProfileString = await readFile(userProfilePath);
  try {
    await Share.share({
      message: userProfileString,
      title: 'User profile in turtle format',
    });
  } catch (err) {
    console.error(`Error sharing the content of ${userProfilePath}`, err);
  }
};
