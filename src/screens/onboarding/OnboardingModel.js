export class OnboardingScreenData {
  constructor() {
    this.onboadingCards = [];
  }

  addOnboardingCard(value) {
    this.onboadingCards.push(value);
  }
}

export class OnboardingCard {
  constructor(datafield, term, title, linkedOnboarding, inputConstraints) {
    this.datafield = datafield;
    this.term = term;
    this.title = title;
    this.linkedOnboarding = linkedOnboarding;
    this.inputConstraints = inputConstraints;
  }
}

export class InputConstraints {
  constructor(datatype, possibleValues, objectClass) {
    this.datatype = datatype;
    this.possibleValues = possibleValues;
    this.objectClass = objectClass;
  }
}
