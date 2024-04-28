export class OnboardingScreenData {
  constructor() {
    this.onboadingCards = [];
  }

  addOnboardingCard(value) {
    this.onboadingCards.push(value);
  }
}

export class OnboardingCard {
  constructor(datafield, term, title, linkedData, inputConstraints) {
    this.datafield = datafield;
    this.term = term;
    this.title = title;
    this.linkedClass = linkedData;
    this.inputConstraints = inputConstraints;
  }
}

export class InputConstraints {
  constructor(datatype, possibleValues) {
    this.datatype = datatype;
    this.possibleValues = possibleValues;
  }
}
