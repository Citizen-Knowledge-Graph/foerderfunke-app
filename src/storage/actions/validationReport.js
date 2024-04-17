// action types
export const VALIDATION_REPORT = 'VALIDATION_REPORT';

// action creator
const validationReportAction = (key, result, details) => {
  const serializableReport = {
    result: result,
    details: details,
  };

  return {
    type: VALIDATION_REPORT,
    payload: { key, report: serializableReport },
  };
};

export default validationReportAction;
