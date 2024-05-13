export class OnboardingScreenData {
  constructor() {
    this.onboadingCards = [];
  }

  insertOnboardingCards(cards, index) {
    this.onboadingCards = [...this.onboadingCards, ...cards];
  }
}

export class OnboardingCard {
  constructor(group, datafield, title, datatype, options, objectClass) {
    this.group = group;
    this.datafield = datafield;
    this.title = title;
    this.datatype = datatype;
    this.options = options;
    this.objectClass = objectClass;
  }
}
