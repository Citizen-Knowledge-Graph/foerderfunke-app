export class OnboardingScreenData {
  constructor() {
    this.onboadingCards = [];
  }

  insertOnboardingCards(cards, index) {
    this.onboadingCards = [...this.onboadingCards, ...cards];
  }
}

export class OnboardingCard {
  constructor(datafield, term, title, inputConstraints) {
    this.datafield = datafield;
    this.term = term;
    this.title = title;
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
