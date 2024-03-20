// functions that are used to interact with the file system

//
// retrieve home screen
// this function will be called from the home screen

//
// retrieve user profile
// this function will be called from the profile screen
//
// export const userProfileData = async () => {
//
//  const userProfileString = readFile(pathToUserFile)
//
//  const userGraph = parseTurtle(userProfileString)
//
//  const relevantUserData = retrieveRelevantFields(userGraph)
//
//  return relevantUserData
// }

//
// update user profile
// this function will be called from the user update report
// export const updateUserProfile = async (updateData) => {
//
//  const userProfileString = readFile(pathToUserFile)
//
//  const userGraph = parseTurtle(userProfileString)
//
//  const newUserGraph = updateUserGraph(userGraph, updateData)
//
//  return Success | Failure
// }
//

// we need to load the entire graph
export const loadGraph = async () => {};

// we need to load json data
export const loadJson = async () => {};

// we need to load single predicate object form a node
export const loadSPOs = async () => {};

// we need to overwrite single predicate object form a node
export const overwriteSPO = async () => {};
