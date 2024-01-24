import { REGISTRY_REPORT } from "../actions/registryReport";

const registryReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTRY_REPORT:
            return {
                ...state,
                [action.payload.key]: action.payload.report
            };
        default:
            return state;
    }
};

export default registryReducer;