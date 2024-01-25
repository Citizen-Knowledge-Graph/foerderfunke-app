// action types
export const VALIDATION_REPORT = 'VALIDATION_REPORT';

// action creator
const validationReportAction = (key, report) => {
    const serializableReport = {
        conforms: report._conforms(),
    };

    return {
        type: VALIDATION_REPORT,
        payload: { key, report: serializableReport }
    };
};

export default validationReportAction;
