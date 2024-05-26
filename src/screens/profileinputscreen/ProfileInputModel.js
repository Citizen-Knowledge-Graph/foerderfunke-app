export class ProfileInputFieldData {
  constructor() {
    this.profileInputFields = [];
  }

  addProfileInputField(profileInputField) {
    this.profileInputFields.push(profileInputField);
  }
}

export class ProfileInputField {
  constructor(
    datafield,
    title,
    datatype,
    options,
    objectClass,
    id,
    type,
    parentId,
    parentType,
    parentDatafield
  ) {
    this.displayData = { title: title };
    this.inputData = {
      datatype: datatype,
      options: options,
      objectClass: objectClass,
    };
    this.entityData = {
      id: id,
      type: type,
      datafield: datafield,
    };
    this.parentData = {
      id: parentId,
      type: parentType,
      datafield: parentDatafield,
    };
  }
}
