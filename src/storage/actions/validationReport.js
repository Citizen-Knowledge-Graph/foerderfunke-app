// action types
export const VALIDATION_REPORT = 'VALIDATION_REPORT';

// action creator
const validationReportAction = (key, report) => {
    const serializableReport = {
        conforms: report._conforms(),
        image: '../assets/images/family_icon.png',
        title: "Foerderungsname",
        description: "Foerderungsdesription",
        time: "8 min"
    };

    return {
        type: VALIDATION_REPORT,
        payload: { key, report: serializableReport }
    };
};

export default validationReportAction;
