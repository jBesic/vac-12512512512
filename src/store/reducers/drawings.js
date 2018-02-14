import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    isFetching: false,
    message: '',
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
            return {
                ...state,
                message: '',
                isFetching: false
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