import * as actionTypes from './actionTypes';

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

        new Promise((resolve, reject) => {
            setTimeout(resolve, 5000);
        }).then(value => {
            const token = 'dummyText';
            localStorage.setItem('token', token);
            dispatch(registerSuccess(token));
            dispatch(AuthenticationModal(false));
        }).catch(error => {
            dispatch(registerFailure('Ooh, something went wrong !'));
            dispatch(AuthenticationModal(false));
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

        new Promise((resolve, reject) => {
            setTimeout(resolve, 5000);
        }).then(value => {
            const token = 'dummyText';
            localStorage.setItem('token', token);
            dispatch(loginSuccess(token));
            dispatch(AuthenticationModal(false));
        }).catch(error => {
            dispatch(loginFailure('Ooh, something went wrong !'));
            dispatch(AuthenticationModal(false));
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

        new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        }).then(value => {
            localStorage.removeItem('token', token);
            dispatch(logoutSuccess(token));
            dispatch(AuthenticationModal(false));
        }).catch(error => {
            dispatch(logoutFailure('Ooh, something went wrong !'));
            dispatch(AuthenticationModal(false));
        });
    }
}

// Authentication modal
const AuthenticationModal = function(component, show) {
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