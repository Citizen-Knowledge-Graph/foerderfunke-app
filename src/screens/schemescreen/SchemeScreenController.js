import { fileExists, readJson } from '../../utilities/fileManagement';

class SchemeGuideData {
  constructor(key, data) {
    this.key = key;
    this.data = data;
  }
}

export const fetchSchemeScreenData = async (queryId) => {
  const schemePath = `requirement-profile-hydrations/${queryId}-hydration.json`;
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
