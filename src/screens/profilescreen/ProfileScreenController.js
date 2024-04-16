import { readFile, readJson, writeFile } from '../../utilities/fileManagement';
import { parseTurtle, serializeTurtle } from '../../utilities/rdfHandling';
import { getFirstOut, updateOut } from '../../utilities/graphManagement';
import { ProfileDataField, ProfileScreenData } from './ProfileScreenModel';
import { Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// config
const dataFields = [
  'ff:hasFirstNames',
  'ff:hasFamilyName',
  'ff:hasBirthday',
  'ff:hasResidence',
];

export const fetchProfileScreenData = async (selectedUser) => {
  let profileScreenData = new ProfileScreenData();
  //
  // fetch content information for each data field
  const userHydrationPath = await AsyncStorage.getItem(
    'user-profile-hydration'
  );
  const userHydrationJson = await readJson(userHydrationPath);
  dataFields.map((key) => {
    const newDataField = new ProfileDataField(key);
    newDataField.setDisplayName(userHydrationJson[key].display_name);
    profileScreenData.addProfileDataField(newDataField);
  });
  //
  // fetch user profile paths
  let userProfileExamples = await AsyncStorage.getItem('user-profile-examples');
  const userProfilePath = userProfileExamples + selectedUser.userId + '.ttl';
  //
  // fetch user data from the user profile
  const userString = await readFile(userProfilePath);
  const userGraph = await parseTurtle(userString);
  profileScreenData.profileData.forEach((entry) => {
    entry.setObject(getFirstOut(userGraph, entry.key));
  });
  //
  // fetch user profile meta data
  const alternativeUserProfilesPath = 'user-profile-examples-registry.json';
  const alternativeUserProfilesJson = await readJson(
    alternativeUserProfilesPath
  );
  Object.keys(alternativeUserProfilesJson).map((key, value) => {
    profileScreenData.addAlternativeUserProfile(key);
  });
  return profileScreenData;
};

export const updateUserProfile = async (
  selectedUser,
  field,
  object,
  updateValue
) => {
  //
  // fetch user profile paths
  let userProfileExamplesPath = await AsyncStorage.getItem(
    'user-profile-examples'
  );
  const userProfilePath =
    userProfileExamplesPath + selectedUser.userId + '.ttl';

  const userString = await readFile(userProfilePath);
  const userGraph = await parseTurtle(userString);
  const updatedGraph = updateOut(userGraph, field, object, updateValue);
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
