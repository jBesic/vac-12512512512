import * as actionTypes from './actionTypes';
import * as vacApi from '../../vacApi';
import {toastr} from 'react-redux-toastr';

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
                dispatch(AuthenticationModal());
                toastr.info('Welcome, ', userName);
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

const AsyncLoginUser = function (userName, password, payload = null) {
    return dispatch => {
        dispatch(loginRequest());

        vacApi.login(userName, password)
            .then(response => {
                const token = response.data.data;
                localStorage.setItem('token', token);
                dispatch(loginSuccess(token));
                dispatch(AuthenticationModal());
                toastr.info('Welcome, ' + userName);
                if (payload) {
                    dispatch(AsyncSaveDrawing(payload));
                }
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
                dispatch(AuthenticationModal());
            }).catch(error => {
                dispatch(logoutFailure(error.response.data.message));
            });
    }
}

// Authentication modal
const AuthenticationModal = function (component, show, message = null, payload = null) {
    return {
        type: actionTypes.AUTHENTICATION_MODAL,
        component: component,
        show: show,
        message: message,
        payload: payload
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

const createEditCompetitionSuccess = function (competition) {
    return {
        type: actionTypes.CREATE_EDIT_COMPETITION_SUCCESS,
        competition: competition
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
                dispatch(createEditCompetitionSuccess({ ...response.data.data }));
                dispatch(createEditCompetitionModal());
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

const setDrawingRequest = function () {
    return {
        type: actionTypes.SET_DRAWING_REQUEST
    }
};

const drawingRequestSuccess = function (token) {
    return {
        type: actionTypes.DRAWING_REQUEST_SUCCESS,
        token: token
    }
};

const drawingRequestFailure = function (message) {
    return {
        type: actionTypes.DRAWING_REQUEST_FAILURE,
        message: message
    }
};

const AsyncSaveDrawing = function (drawing) {
    return dispatch => {
        dispatch(setDrawingRequest());
        vacApi.saveDrawing(drawing)
            .then(response => {
                dispatch(drawingRequestSuccess());
                dispatch(resetCanvasGlobalState());
                toastr.success('Saved successfully.');
            }).catch(error => {
                dispatch(drawingRequestFailure(error.response.data.message));
            });
    }
}

const resetCanvasGlobalState = () => {
    return {
        type: actionTypes.RESET_CANVAS_GLOBAL_STATE
    };
}

const updateResetCanvasLocalStateField = (val) => {
    return {
        type: actionTypes.UPDATE_RESET_CANVAS_LOCAL_STATE_FIELD,
        value: val
    };
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
    createEditCompetitionModal,
    AsyncSaveDrawing,
    updateResetCanvasLocalStateField
};