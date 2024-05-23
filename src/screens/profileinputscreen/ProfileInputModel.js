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
  constructor(datafield, title, datatype, options, objectClass) {
    this.datafield = datafield;
    this.title = title;
    this.datatype = datatype;
    this.options = options;
    this.objectClass = objectClass;
  }
}
