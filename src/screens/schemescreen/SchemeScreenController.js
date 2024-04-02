import { readJson } from '../../utilities/fileManagement';

class SchemeGuideData {
  constructor(key, data) {
    this.key = key;
    this.data = data;
  }
}

export const fetchSchemeScreenData = async (scheme) => {
  const registryPath = 'query-registry.json';
  const registry = await readJson(registryPath);
  const schemePath = `${registry[scheme].path}/${scheme}-hydration.json`;
  const schemeData = await readJson(schemePath);
  return new SchemeGuideData(scheme, schemeData);
};
