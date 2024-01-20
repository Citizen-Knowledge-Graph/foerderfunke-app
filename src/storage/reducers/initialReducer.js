const initialState = {
    // Your initial state
};

function initialReducer(state = initialState, action) {
    switch (action.type) {
        case 'YOUR_ACTION_TYPE':
            // Handle action
            return {
                ...state,
                // New state
            };
        default:
            return state;
    }
}

export default initialReducer;