// action types
export const REGISTRY_REPORT = 'REGISTRY_REPORT';

// action creator
const registryReportAction = (key, report) => {
  return {
    type: REGISTRY_REPORT,
    payload: {key, report: report},
  };
};

export default registryReportAction;
