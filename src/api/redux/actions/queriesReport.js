// action types
export const QUERIES_REPORT = 'QUERIES_REPORT';

// action creator
const queriesReportAction = (key, report) => {
  return {
    type: QUERIES_REPORT,
    payload: { key, report: report },
  };
};

export default queriesReportAction;
