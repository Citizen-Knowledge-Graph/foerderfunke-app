export class OnboardingScreenData {
  constructor() {
    this.onboadingCards = [];
  }

  addOnboardingCard(value) {
    this.onboadingCards.push(value);
  }
}

export class OnboardingCard {
  constructor(datafield, title, description, inputConstraints) {
    this.datafield = datafield;
    this.title = title;
    this.description = description;
    this.inputConstraints = inputConstraints;
  }
}

export class InputConstraints {
  constructor(datatype, possibleValues) {
    this.datatype = datatype;
    this.possibleValues = possibleValues;
  }
}
