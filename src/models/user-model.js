import { storage } from '../storage/mmkv';

class UserStore {
  // set a new field in the user data
  setField(userId, field, value) {
    let userProfile = this.retrieveUserData(userId);
    userProfile[field] = value;
    this.storeUserData(userId, userProfile);
  }

  // store user data to mmkv
  storeUserData(userId, userData) {
    storage.set(userId, JSON.stringify(userData));
  }

  // retrieve the user data from mmkv
  retrieveUserData(userId) {
    const userString = storage.getString(userId);
    return JSON.parse(userString);
  }
}
