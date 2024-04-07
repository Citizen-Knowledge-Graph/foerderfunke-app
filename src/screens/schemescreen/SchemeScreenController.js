import { readJson } from '../../utilities/fileManagement';

class SchemeGuideData {
  constructor(key, data) {
    this.key = key;
    this.data = data;
  }
}

export const fetchSchemeScreenData = async (queryId) => {
  const schemePath = `requirement-profile-hydrations/${queryId}-hydration.json`;
  const schemeData = await readJson(schemePath);
  return new SchemeGuideData(queryId, schemeData);
};
