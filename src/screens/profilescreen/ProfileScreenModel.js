export class ProfileScreenData {
  constructor() {
    this.profileData = [];
    this.alternativeUserProfiles = [];
  }

  addProfileDataField(value) {
    this.profileData.push(value);
  }

  addAlternativeUserProfile(value) {
    this.alternativeUserProfiles = value;
  }
}

export class ProfileDataField {
  constructor(key) {
    this.key = key;
    this.displayName = null;
    this.value = null;
  }

  setValue(value) {
    this.value = value;
  }

  setDisplayName(value) {
    this.displayName = value;
  }
}
