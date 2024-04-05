// action types
export const SELECT_USER_REPORT = 'SELECT_USER_REPORT';

// action creator
const selectUser = (userId) => {
  return {
    type: SELECT_USER_REPORT,
    payload: { userId: userId },
  };
};

export default selectUser;
