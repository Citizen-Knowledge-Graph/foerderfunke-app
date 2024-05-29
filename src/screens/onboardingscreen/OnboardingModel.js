export class ProfileSectionsData {
  constructor(userId) {
    this.entityData = {
      id: userId,
      type: 'ff:Citizen',
    };
    this.personalisedData = [];
  }

  addPersonalisedData(newProfileSection) {
    this.personalisedData.push(newProfileSection);
  }
}

export class ProfileSectionStatus {
  constructor(id, title, completed, active) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.active = active;
  }
}
