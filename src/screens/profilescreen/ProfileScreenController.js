import {readFile, writeFile} from '../../utilities/fileManagement';
import {parseTurtle, serializeTurtle} from '../../utilities/rdfHandling';
import {
  getFirstAttributeValue,
  NamespacedTerm,
  updatePredicatedObject,
} from '../../utilities/graphManagement';

class ProfileDataField {
  constructor(key, key_namespace, title) {
    this.key = key;
    this.key_namespace = key_namespace;
    this.value = null;
    this.value_namespace = null;
    this.title = title;
  }

  setValue(value) {
    this.value = value;
  }
}

const dataFields = [
  new ProfileDataField('owns', 'ff', 'Owns'),
  new ProfileDataField('hasName', 'ff', 'Name'),
  new ProfileDataField('hasSurname', 'ff', 'Surname'),
  new ProfileDataField('hasBirthday', 'ff', 'Birthday'),
  new ProfileDataField('hasResidence', 'ff', 'Residence'),
  new ProfileDataField('hasDrivingLicense', 'ff', 'Driving License'),
  new ProfileDataField('hasChildren', 'ff', 'Children'),
];

export const fetchProfileScreenData = async () => {
  const userPath = 'user-profile.ttl';
  const userString = await readFile(userPath);
  const userGraph = await parseTurtle(userString);
  const data = dataFields.map(field => {
    field.setValue(
      getFirstAttributeValue(
        userGraph,
        new NamespacedTerm('ff', 'user-profile'),
        new NamespacedTerm(field.key_namespace, field.key),
      ),
    );
    return field;
  });
  console.log(data);
  return data;
};

export const updateUserProfile = async (entry, updateValue) => {
  const userPath = 'user-profile.ttl';
  const userString = await readFile(userPath);
  const userGraph = await parseTurtle(userString);
  const updatedGraph = updatePredicatedObject(
    userGraph,
    new NamespacedTerm(entry.namespace, entry.key),
    initialValue,
    'replace',
    updateValue,
  );
  const updatedGraphString = await serializeTurtle(updatedGraph);
  console.log('new ttl: ', updatedGraphString);
  await writeFile('user-profile.tt', updatedGraphString);
};
