export class ProfileInputFieldData {
  constructor(id) {
    this.id = id;
    this.profileInputFields = [];
  }

  addProfileInputField(profileInputField) {
    this.profileInputFields.push(profileInputField);
  }
}

export class ProfileInputField {
  constructor(title, datafield, datatype, options, objectClass) {
    this.title = title;
    this.datafield = datafield;
    this.datatype = datatype;
    this.options = options;
    this.objectClass = objectClass;
  }
}
