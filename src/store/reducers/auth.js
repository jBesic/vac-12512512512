import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    AUTHENTICATION_MODAL
} from '../actions/actionTypes'

const INITIAL_STATE = {
    loginActive: false,
    registerActive: false,
    isFetching: false,
    isLoged: localStorage.getItem('token') ? true : false
};

function registerUser(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTHENTICATION_MODAL:
            return {
                ...state,
                loginActive: action.component === 'login' ? action.show : false,
                registerActive: action.component === 'register' ? action.show : false
            }

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

        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoged: true
            };

        case LOGIN_FAILURE:
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