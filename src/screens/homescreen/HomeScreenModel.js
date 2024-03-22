export class HomeScreenData {
  constructor(key) {
    this.key = key;
    this.title = null;
    this.description = null;
  }

  setTitle(value) {
    this.title = value;
  }

  setDescription(value) {
    this.description = value;
  }
}
