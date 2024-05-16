export class HomeScreenData {
  constructor() {
    this.eligible = [];
    this.nonEligible = [];
    this.missingData = [];
    this.missingUserInputsAggregated = [];
    this.metdata = {};
  }

  addEligible(value) {
    this.eligible.push(value);
  }

  addNonEligible(value) {
    this.nonEligible.push(value);
  }

  addMissingData(value) {
    this.missingData.push(value);
  }

  setMissingUserInputsAggregated(value) {
    this.missingUserInputsAggregated = value;
  }

  setMetadata(value) {
    this.metadata = value;
  }
}

export class SchemeData {
  constructor(key) {
    this.key = key;
    this.title = null;
    this.description = null;
    this.details = null;
  }

  setTitle(value) {
    this.title = value;
  }

  setDescription(value) {
    this.description = value;
  }

  setDetails(value) {
    this.details = value;
  }
}
