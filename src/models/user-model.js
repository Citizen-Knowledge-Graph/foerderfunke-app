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
    const userIds = JSON.parse(storage.getString('userIds') || '[]');
    if (!userIds.includes(userId)) {
      userIds.push(userId);
      storage.set('userIds', JSON.stringify(userIds));
    }
  }

  // retrieve the user data from mmkv
  static retrieveUserData(userId) {
    let userString = storage.getString(userId);
    if (!userString) {
      userString = '{}';
      storage.set(userId, userString);
    }
    return JSON.parse(userString);
  }

  // return all user ids
  static retrieveAllUserIds() {
    return JSON.parse(storage.getString('userIds') || '[]');
  }
}
