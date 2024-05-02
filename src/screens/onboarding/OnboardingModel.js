export class OnboardingScreenData {
  constructor() {
    this.onboadingCards = [];
  }

  insertOnboardingCards(cards, index) {
    this.onboadingCards = [
      ...this.onboadingCards.slice(0, index),
      ...cards,
      ...this.onboadingCards.slice(index),
    ];
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
