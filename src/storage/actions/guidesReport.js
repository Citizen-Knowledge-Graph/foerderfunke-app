// action types
export const GUIDES_REPORT = 'GUIDES_REPORT';

// action creator
const guidesReportAction = (key, report) => {
  return {
    type: GUIDES_REPORT,
    payload: { key, report: report },
  };
};

export default guidesReportAction;
