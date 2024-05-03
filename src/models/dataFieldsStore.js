import { storage } from '../storage/mmkv';

export class DataFieldsStore {
  storeDataFieldsString(dataFieldsString) {
    storage.set('dataFieldsString', dataFieldsString);
  }

  retrieveDataFieldsString(userId) {
    return storage.getString('dataFieldsString');
  }
}
