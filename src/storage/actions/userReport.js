// action types
export const USER_REPORT = 'USER_REPORT';

// action creator
const userReportAction = (key, report) => {
  return {
    type: USER_REPORT,
    payload: {key, report: report},
  };
};

export default userReportAction;
