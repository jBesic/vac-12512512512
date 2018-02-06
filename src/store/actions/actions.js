import * as actionTypes from './actionTypes';

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

// This makes the async call to an endpoint
const AsyncRegisterUser = function (userName, password) {
    return dispatch => {
        dispatch(registerRequest());

        new Promise((resolve, reject) => {
            setTimeout(resolve, 5000);
        }).then(value => {
            const token = 'dummyText';
            localStorage.setItem('token', token);
            dispatch(registerSuccess(token));
        }).catch(error => {
            dispatch(registerFailure('Ooh, something went wrong !'));
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

// This makes the async call to an endpoint
const AsyncLogoutUser = function (token) {
    return dispatch => {
        dispatch(logoutRequest());

        new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        }).then(value => {
            localStorage.removeItem('token', token);
            dispatch(logoutSuccess(token));
        }).catch(error => {
            dispatch(logoutFailure('Ooh, something went wrong !'));
        });
    }
}

export {
    AsyncRegisterUser,
    AsyncLogoutUser
};