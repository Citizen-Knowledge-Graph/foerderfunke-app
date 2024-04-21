// action types
export const VALIDATION_REPORT = 'VALIDATION_REPORT';

// action creator
const validationReportAction = (validateAllReport) => {
  const serializableReport = {
    validateAllReport: validateAllReport,
  };

  return {
    type: VALIDATION_REPORT,
    payload: { report: serializableReport },
  };
};

export default validationReportAction;
