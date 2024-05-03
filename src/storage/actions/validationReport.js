// action types
export const VALIDATION_REPORT = 'VALIDATION_REPORT';

// action creator
const validationReportAction = (validateAllReport) => {
  return {
    type: VALIDATION_REPORT,
    report: validateAllReport,
  };
};

export default validationReportAction;
