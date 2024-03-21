import {readFile} from '../../utilities/fileManagement';
import {parseTurtle} from '../../utilities/rdfHandling';
import {getFirstAttributeValue} from '../../utilities/graphManagement';

class ProfileDataField {
  constructor(key, title) {
    this.key = key;
    this.title = title;
  }
}

class ProfileDataValuePair {
  constructor(title, value) {
    this.title = title;
    this.value = value;
  }
}

const dataFields = [
  new ProfileDataField('hasName', 'Name'),
  new ProfileDataField('hasSurname', 'Surname'),
  new ProfileDataField('hasBirthday', 'Birthday'),
  new ProfileDataField('hasResidence', 'Residence'),
  new ProfileDataField('hasDrivingLicense', 'Driving License'),
  new ProfileDataField('hasChildren', 'Children'),
];

export const fetchProfileScreenData = async () => {
  const userPath = 'user-profile.ttl';
  const userString = await readFile(userPath);
  const userGraph = await parseTurtle(userString);

  const profileMap = {};

  dataFields.forEach(
    field =>
      (profileMap[field.key] = new ProfileDataValuePair(
        field.title,
        getFirstAttributeValue(userGraph, 'user-profile', field.key),
      )),
  );
  console.log(profileMap);

  return profileMap;
};
