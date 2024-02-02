// action types
import {serializeTurtle} from '../../utilities/rdfHandling';

export const USER_REPORT = 'USER_REPORT';

// action creator
const userReportAction = (key, report) => dispatch => {
  serializeTurtle(report)
    .then(serializedReport => {
      dispatch({
        type: USER_REPORT,
        payload: {key, report: serializedReport},
      });
    })
    .catch(error => {
      console.error('Error serializing user report', error);
    });
};

export default userReportAction;
