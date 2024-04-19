export class OnboardingScreenData {
  constructor() {
    this.onboadingCards = [];
  }

  addOnboardingCard(value) {
    this.onboadingCards.push(value);
  }
}

export class OnboardingCard {
  constructor(datafield, title, description, datatype, possibleValues) {
    this.datafield = datafield;
    this.title = title;
    this.description = description;
    this.datatype = datatype;
    this.possibleValues = possibleValues;
  }
}
