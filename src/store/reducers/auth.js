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
    message: '',
    isLoged: localStorage.getItem('token') ? true : false,
    userId: null,
    payload: null
};

function registerUser(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTHENTICATION_MODAL:
            return {
                ...state,
                message: action.message ? action.message : null,
                payload: action.payload ? action.payload : null,
                loginActive: action.component === 'login' ? action.show : false,
                registerActive: action.component === 'register' ? action.show : false
            }

        case REGISTER_REQUEST:
            return {
                ...state,
                message: '',
                isFetching: true
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                message: '',
                isFetching: false,
                isLoged: true,
                userId: null,
                payload: null
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };

        case LOGIN_REQUEST:
            return {
                ...state,
                message: '',
                isFetching: true,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                message: '',
                isFetching: false,
                isLoged: true,
                payload: null,
                userId: action.userId
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };

        case LOGOUT_REQUEST:
            return {
                ...state,
                message: '',
                isFetching: true,
                isLoged: true
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                message: '',
                isFetching: false,
                userId: null,
                isLoged: false
            };

        case LOGOUT_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };

        default:
            return state;
    }
}

export default registerUser;