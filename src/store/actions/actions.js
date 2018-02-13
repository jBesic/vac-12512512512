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

const AuthenticationModal = function (component, show) {
    return {
        type: actionTypes.AUTHENTICATION_MODAL,
        component: component,
        show: show
    }
};

// Create/Edit competition
const createEditCompetitionModal = function (component, show) {
    return {
        type: actionTypes.CREATE_EDIT_COMPETITION_MODAL,
        component: component,
        show: show
    }
};

const createEditCompetitionRequest = function () {
    return {
        type: actionTypes.CREATE_EDIT_COMPETITION_REQUEST
    }
};

const createEditCompetitionSuccess = function (token) {
    return {
        type: actionTypes.CREATE_EDIT_COMPETITION_SUCCESS,
        token: token
    }
};

const createEditCompetitionFailure = function (message) {
    return {
        type: actionTypes.CREATE_EDIT_COMPETITION_FAILURE,
        message: message
    }
};

const AsyncCreateEditCompetition = function (competitonData) {
    return dispatch => {
        dispatch(createEditCompetitionRequest());

        vacApi.saveCompetition(competitonData)
            .then(response => {
                dispatch(createEditCompetitionSuccess());
                // dispatch(asyncEnd());
            }).catch(error => {
                dispatch(createEditCompetitionFailure(error.response.data.message));
            });
    }
}



const addShape = (shape) => {
    return {
        type: actionTypes.ADD_SHAPE,
        shape: shape
    }
};

const updateShape = (shape) => {
    return {
        type: actionTypes.UPDATE_SHAPE,
        shape: shape
    }
};

const deleteShape = (shape) => {
    return {
        type: actionTypes.DELETE_SHAPE,
        shape: shape
    }
};

const deleteShapes = (shapeIds) => {
    return {
        type: actionTypes.DELETE_SHAPES,
        shapeIds: shapeIds
    }
};

const addGroup = () => {
    return {
        type: actionTypes.ADD_GROUP
    }
}

const deleteGroup = () => {
    return {
        type: actionTypes.DELETE_GROUP
    }
}

const moveElement = (type) => {
    return {
        type: type
    }
};

const selectElement = (elementId) => {
    return {
        type: actionTypes.SELECT_ELEMENT,
        elementId: elementId
    }
};

const moveShapeOtherGroup = (shapeId, newGroupId) => {
    return {
        type: actionTypes.MOVE_SHAPE_TO_OTHER_GROUP,
        shapeId: shapeId,
        newGroupId: newGroupId
    }
};

const moveShapeElement = (type, shapeId) => {
    return {
        type: type,
        shapeId: shapeId
    }
};

const undo = () => {
    return {
        type: actionTypes.UNDO
    }
}

const redo = () => {
    return {
        type: actionTypes.REDO
    }
}

export {
    AsyncRegisterUser,
    AsyncLogoutUser,
    AsyncLoginUser,
    AuthenticationModal,
    addShape,
    deleteShape,
    deleteShapes,
    updateShape,
    addGroup,
    deleteGroup,
    moveElement,
    selectElement,
    moveShapeOtherGroup,
    moveShapeElement,
    undo,
    redo,
    AsyncCreateEditCompetition,
    createEditCompetitionModal
};