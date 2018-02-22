import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    users: [],
    isFetching: false,
    message: '',
    modifiedDate: null
};

function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.SET_USER_REQUEST:
            return {
                ...state,
                message: '',
                isFetching: true
            };

        case actionTypes.USER_REQUEST_SUCCESS:
            return {
                ...state,
                message: '',
                isFetching: false,
                users: action.users,
                modifiedDate: new Date()
            };

        case actionTypes.USER_REQUEST_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };

        case actionTypes.RESET_USERS_STATE:
            return { ...INITIAL_STATE };

        default:
            return state;
    }
}

export default users;