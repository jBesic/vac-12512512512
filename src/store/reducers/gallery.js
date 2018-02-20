import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    drawings: [],
    users: [],
    competitions: []
};

function gallery(state = INITIAL_STATE, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default gallery;