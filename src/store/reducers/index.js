import { combineReducers } from 'redux';
import canvasReducer from './canvas';
import groupsReducer from './groups';
import auth from './auth';
import competitionsReducer from './competitions';

export default combineReducers({
    auth: auth,
    canvas: canvasReducer,
    groupsSettings: groupsReducer,
    competitions: competitionsReducer
});
