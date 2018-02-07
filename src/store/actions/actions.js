import * as actionTypes from './actionTypes';
import * as vacApi from '../../vacApi';

// Register
const registerRequest = function () {
    return {
        type: actionTypes.REGISTER_REQUEST
    }
};

const registerSuccess = function (token) {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        token: token
    }
};

const registerFailure = function (message) {
    return {
        type: actionTypes.REGISTER_FAILURE,
        message: message
    }
};

const AsyncRegisterUser = function (userName, password) {
    return dispatch => {
        dispatch(registerRequest());

        vacApi.register(userName, password)
            .then(response => {
                const token = response.data.data;
                localStorage.setItem('token', token);
                dispatch(registerSuccess(token));
                dispatch(AuthenticationModal(false));
            }).catch(error => {
                dispatch(registerFailure(error.response.data.message));
            });
    }
}

// Login
const loginRequest = function () {
    return {
        type: actionTypes.LOGIN_REQUEST
    }
};

const loginSuccess = function (token) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token
    }
};

const loginFailure = function (message) {
    return {
        type: actionTypes.LOGIN_FAILURE,
        message: message
    }
};

const AsyncLoginUser = function (userName, password) {
    return dispatch => {
        dispatch(loginRequest());

        vacApi.login(userName, password)
            .then(response => {
                const token = response.data.data;
                localStorage.setItem('token', token);
                dispatch(loginSuccess(token));
                dispatch(AuthenticationModal(false));
            }).catch(error => {
                dispatch(loginFailure(error.response.data.message));
            });
    }
}

// Logout
const logoutRequest = function () {
    return {
        type: actionTypes.LOGOUT_REQUEST
    }
};

const logoutSuccess = function (token) {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        token: token
    }
};

const logoutFailure = function (message) {
    return {
        type: actionTypes.LOGOUT_FAILURE,
        message: message
    }
};

const AsyncLogoutUser = function (token) {
    return dispatch => {
        dispatch(logoutRequest());

        vacApi.logout(token)
            .then(response => {
                localStorage.removeItem('token');
                dispatch(logoutSuccess(token));
                dispatch(AuthenticationModal(false));
            }).catch(error => {
                dispatch(logoutFailure(error.response.data.message));
            });
    }
}

// Authentication modal
const AuthenticationModal = function (component, show) {
    return {
        type: actionTypes.AUTHENTICATION_MODAL,
        component: component,
        show: show
    }
};

export {
    AsyncRegisterUser,
    AsyncLogoutUser,
    AsyncLoginUser,
    AuthenticationModal
};