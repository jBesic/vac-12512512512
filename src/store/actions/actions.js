import * as actionTypes from './actionTypes';
import * as vacApi from '../../vacApi';
import { toastr } from 'react-redux-toastr';

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
const manageCompetitionModal = function (component, show, competitionId) {
    return {
        type: actionTypes.COMPETITION_MODAL,
        component: component,
        show: show,
        competitionId: competitionId
    }
};

const asyncCompetitionRequest = function () {
    return {
        type: actionTypes.ASYNC_COMPETITION_REQUEST
    }
};

const asyncCompetitionSuccess = function (status, competitions) {
    return {
        type: actionTypes.ASYNC_COMPETITION_SUCCESS,
        status: status,
        competitions: competitions
    }
};

const asyncCompetitionFailure = function (message) {
    return {
        type: actionTypes.ASYNC_COMPETITION_FAILURE,
        message: message
    }
};

const startCompetition = function (competitionDetails) {
    return {
        type: actionTypes.START_COMPETITION,
        competitionDetails: competitionDetails
    }
}

const AsyncCreateEditCompetition = function (competitonData) {
    return dispatch => {
        dispatch(asyncCompetitionRequest());

        vacApi.saveCompetition(competitonData)
            .then(response => {
                dispatch(asyncCompetitionSuccess('own', [...response]));
                dispatch(manageCompetitionModal());
            }).catch(error => {
                dispatch(asyncCompetitionFailure(error.response.data.message));
            });
    }
}

const AsyncLoadCompetitions = function (status) {
    return dispatch => {
        dispatch(asyncCompetitionRequest());

        vacApi.loadCompetitions(status)
            .then(response => {
                dispatch(asyncCompetitionSuccess(status, [...response]));
            }).catch(error => {
                dispatch(asyncCompetitionFailure(error.response.data.message));
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

const drawingRequestSuccess = function (drawings = null) {
    return {
        type: actionTypes.DRAWING_REQUEST_SUCCESS,
        drawings: drawings
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

const setUserRequest = function () {
    return {
        type: actionTypes.SET_USER_REQUEST
    }
};

const userRequestSuccess = function (users) {
    return {
        type: actionTypes.USER_REQUEST_SUCCESS,
        users: users
    }
};

const userRequestFailure = function (message) {
    return {
        type: actionTypes.USER_REQUEST_FAILURE,
        message: message
    }
};

const AsyncGetUsers = function (offset, limit) {
    return dispatch => {
        dispatch(setUserRequest());
        vacApi.getUsers(offset, limit)
            .then(response => {
                dispatch(userRequestSuccess([...response.data.data]));
            }).catch(error => {
                dispatch(userRequestFailure(error.response.data.message));
            });
    }
}

const AsyncGetCompetitions = function (offset, limit) {
    return dispatch => {
        dispatch(asyncCompetitionRequest());
        vacApi.getCompetitions(offset, limit)
            .then(response => {
                dispatch(asyncCompetitionSuccess(null, [...response.data.data]));
            }).catch(error => {
                dispatch(asyncCompetitionFailure(error.response.data.message));
            });
    }
}

const AsyncGetDrawingsByUserId = function (userId, offset, limit) {
    return dispatch => {
        dispatch(setDrawingRequest());
        vacApi.getDrawingsByUserId(userId, offset, limit)
            .then(response => {
                dispatch(drawingRequestSuccess([ ...response.data.data ]));
            }).catch(error => {
                dispatch(drawingRequestFailure(error.response.data.message));
            });
    }
}

const AsyncGetAllDrawings = function () {
    return dispatch => {
        dispatch(setDrawingRequest());
        vacApi.getAllDrawings()
            .then(response => {
                dispatch(drawingRequestSuccess([ ...response.data.data ]));
            }).catch(error => {
                dispatch(drawingRequestFailure(error.response.data.message));
            });
    }
}

const AsyncGetDrawingsByCompetitionId = function (competitionId, offset, limit) {
    return dispatch => {
        dispatch(setDrawingRequest());
        vacApi.getDrawingsByCompetitionId(competitionId, offset, limit)
            .then(response => {
                dispatch(drawingRequestSuccess([ ...response.data.data ]));
            }).catch(error => {
                dispatch(drawingRequestFailure(error.response.data.message));
            });
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
    AsyncLoadCompetitions,
    manageCompetitionModal,
    AsyncSaveDrawing,
    updateResetCanvasLocalStateField,
    startCompetition,
    AsyncGetUsers,
    AsyncGetCompetitions,
    AsyncGetDrawingsByUserId,
    AsyncGetAllDrawings,
    AsyncGetDrawingsByCompetitionId
};