export class ProfileScreenData {
  constructor() {
    this.profileData = [];
    this.alternativeUserProfiles = [];
  }

  addProfileDataField(value) {
    this.profileData.push(value);
  }

  addAlternativeUserProfile(value) {
    this.alternativeUserProfiles.push(value);
  }
}

export class ProfileDataField {
  constructor(key) {
    this.key = key;
    this.displayName = null;
    this.namespace = null;
    this.name = null;
    this.object = null;
  }

  setObject(value) {
    this.object = value;
  }

  setDisplayName(value) {
    this.displayName = value;
  }

  setName(value) {
    this.name = value;
  }

  setNamespace(value) {
    this.namespace = value;
  }
}
