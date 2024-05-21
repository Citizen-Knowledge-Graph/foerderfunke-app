export class PersonalisedScreenData {
  constructor() {
    this.onboardingCards = [];
  }

  insertOnboardingCards(newOnboardingCards, index) {
    this.onboardingCards[index] = newOnboardingCards;
  }
}
