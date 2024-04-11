import { fileExists, readJson } from '../../utilities/fileManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SchemeGuideData {
  constructor(key, data) {
    this.key = key;
    this.data = data;
  }
}

export const fetchSchemeScreenData = async (queryId) => {
  const hydrationsPath = await AsyncStorage.getItem(
    'requirement-profile-hydration'
  );
  const schemePath = `${hydrationsPath}/${queryId}-hydration.json`;
  let schemeData;
  if (await fileExists(schemePath)) {
    schemeData = await readJson(schemePath);
  } else {
    schemeData = {
      title: 'no title yet',
      sub_title: 'no subtitle yet',
      description_long: 'no long description yet',
    };
  }
  return new SchemeGuideData(queryId, schemeData);
};
