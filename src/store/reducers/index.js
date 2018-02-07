import { combineReducers } from 'redux';
import canvasReducer from './canvas';
import auth from './auth';

export default combineReducers({
    auth: auth,
    canvas: canvasReducer
});
