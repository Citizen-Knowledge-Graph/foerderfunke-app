import { storage } from '../storage/mmkv';

export class UserStore {
  // set a new field in the user data
  static setField(userId, field, value) {
    let userProfile = UserStore.retrieveUserData(userId);
    userProfile[field] = value;
    UserStore.storeUserData(userId, userProfile);
  }

  // store user data to mmkv
  static storeUserData(userId, userData) {
    storage.set(userId, JSON.stringify(userData));
  }

  // retrieve the user data from mmkv
  retrieveUserData(userId) {
    const userString = storage.getString(userId);
    return JSON.parse(userString);
  }
}
