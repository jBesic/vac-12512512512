import { combineReducers } from 'redux';
import canvasReducer from './canvas';
import groupsReducer from './groups';
import auth from './auth';
import competitionsReducer from './competitions';
import drawingsReducer from './drawings';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
    auth: auth,
    canvas: canvasReducer,
    groupsSettings: groupsReducer,
    competitions: competitionsReducer,
    drawings: drawingsReducer,
    toastr: toastrReducer
});
