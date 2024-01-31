import { serializeTurtle } from "../../utilities/rdfHandling";

const rdfMiddleware = store => next => action => {
  if (action.type === 'ADD_RDF_DATA') {
    const serializedData = serializeTurtle(action.payload.report);
    const newAction = {
      ...action,
      payload: {...action.payload, report: serializedData},
    };
    return next(newAction);
  }

  // Other middleware logic
  return next(action);
};

export default rdfMiddleware;
