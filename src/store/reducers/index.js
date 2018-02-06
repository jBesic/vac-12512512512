import { combineReducers } from 'redux';
import INITIAL_STATE from '../initialState';

const isLoged = function(state = INITIAL_STATE, action) {
    return state;
}

const reducers = combineReducers({
    isLoged
});

export default reducers;