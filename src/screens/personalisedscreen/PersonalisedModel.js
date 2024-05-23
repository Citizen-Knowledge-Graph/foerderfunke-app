export class PersonalisedModel {
  constructor(profileSections) {
    this.personalisedData = profileSections;
  }

  addPersonalisedData(data) {
    this.personalisedData.push(data);
  }
}
