import { combineReducers } from 'redux';
import canvasReducer from './canvas';
import groupsReducer from './groups';
import auth from './auth';

export default combineReducers({
    auth: auth,
    canvas: canvasReducer,
    groupsSettings: groupsReducer
});
