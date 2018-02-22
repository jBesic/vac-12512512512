import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    drawings: [],
    isFetching: false,
    message: ''
};

function drawings(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.SET_DRAWING_REQUEST:
            return {
                ...state,
                message: '',
                isFetching: true
            };

        case actionTypes.DRAWING_REQUEST_SUCCESS:
            let drawings = action.drawings ? action.drawings : [];
            return {
                ...state,
                message: '',
                isFetching: false,
                drawings: drawings
            };

        case actionTypes.DRAWING_REQUEST_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };

        default:
            return state;
    }
}

export default drawings;