import { storage } from '../storage/mmkv';

export class UserStore {
  // set a new field in the user data
  static setField(userId, field, value) {
    let userProfile = UserStore.retrieveUserData(userId);
    userProfile[field] = value;
    console.log('Updated user profile:', userId, userProfile);
    UserStore.storeUserData(userId, userProfile);
    console.log('ALL KEYS: ', storage.getAllKeys());
    console.log('USER DATA: ', storage.getString(userId));
  }

  // store user data to mmkv
  static storeUserData(userId, userData) {
    console.log('Storing user data for: ', userId);
    storage.set(userId, JSON.stringify(userData));
    const userIds = JSON.parse(storage.getString('userIds') || '[]');
    if (!userIds.includes(userId)) {
      userIds.push(userId);
      storage.set('userIds', JSON.stringify(userIds));
    }
  }

  // retrieve the user data from mmkv
  static retrieveUserData(userId) {
    console.log('Fetching user data for: ', userId);
    const userString = storage.getString(userId);
    return JSON.parse(userString);
  }

  // return all user ids
  static retrieveAllUserIds() {
    return JSON.parse(storage.getString('userIds') || '[]');
  }
}
