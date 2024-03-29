// action types
export const VALIDATION_REPORT = 'VALIDATION_REPORT';

// action creator
const validationReportAction = (key, conforms) => {
  const serializableReport = {
    conforms: conforms,
  };

  return {
    type: VALIDATION_REPORT,
    payload: { key, report: serializableReport },
  };
};

export default validationReportAction;
