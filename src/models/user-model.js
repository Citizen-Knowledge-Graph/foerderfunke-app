import { storage } from '../storage/mmkv';

export class UserStore {
  static initialiseNewUser(userId) {
    // check if the user already exists
    if (storage.getString(userId)) {
      throw new Error('User already exists');
    }

    // create a new user
    let userString = `{"@id":"${userId}","@type":"ff:Citizen"}`;
    storage.set(userId, userString);

    // add the user to the list of user ids
    const userIds = JSON.parse(storage.getString('userIds') || '[]');
    if (!userIds.includes(userId)) {
      userIds.push(userId);
      storage.set('userIds', JSON.stringify(userIds));
    }
  }

  // set a new field in the user data
  static setField(entityId, entityType, datafield, value) {
    let userProfile = UserStore.retrieveUserData(entityId);

    if (
      userProfile['@id'] === entityId &&
      userProfile['@type'] === entityType
    ) {
      userProfile[datafield] = value;
      UserStore.storeUserData(entityId, userProfile);
      return 0;
    }

    for (const entry in userProfile) {
      if (Array.isArray(userProfile[entry])) {
        // retrieve both the entry and the index
        for (const [nestedEntry, index] in userProfile[entry].entries) {
          if (
            nestedEntry['@id'] === entityId &&
            nestedEntry['@type'] === entityType
          ) {
            userProfile[entry][index][datafield] = value;
            UserStore.storeUserData(entityId, userProfile);
            return 0;
          }
        }
      }
    }

    userProfile[datafield] = value;
    console.log('user profile', userProfile);
    UserStore.storeUserData(entityId, userProfile);
  }

  // set a new field in the nested user data
  static setNestedField(userId, group, id, field, value) {
    console.log('setNestedField', userId, group, id, field, value);
    let userProfile = UserStore.retrieveUserData(userId);
    if (!userProfile[group]) {
      userProfile[group] = [];
    }
    if (!userProfile[group][id]) {
      userProfile[group][id] = {};
    }
    userProfile[group][id][field] = value;
    console.log('user profile', userProfile);
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
  static retrieveUserData(entityId) {
    let userString = storage.getString(entityId);
    if (!userString) {
      userString = `{"@id":"${entityId}", "@type":"ff:Citizen"}`;
      storage.set(entityId, userString);
    }

    return JSON.parse(userString);
  }

  // return all user ids
  static retrieveAllUserIds() {
    return JSON.parse(storage.getString('userIds') || '[]');
  }
}
