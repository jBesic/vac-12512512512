import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from '../actions/actionTypes'

const INITIAL_STATE = {
    isFetching: false,
    isLoged: localStorage.getItem('token') ? true : false
};

function registerUser(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoged: true
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false
            };

        case LOGOUT_REQUEST:
            return {
                ...state,
                isFetching: true,
                isLoged: true
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoged: false
            };

        case LOGOUT_FAILURE:
            return {
                ...state,
                isFetching: false,
            };

        default:
            return state;
    }
}

export default registerUser;