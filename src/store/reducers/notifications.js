import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    notifications: [],
    numberOfNewNotifications: 0
};

function notifications(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.GET_USER_NOTIFICATIONS: return {...state, notifications: action.notifications, numberOfNewNotifications: action.numberOfNewNotifications};
        case actionTypes.CLEAR_NOTIFICATIONS: return {...INITIAL_STATE};
        default:
            return state;
    }
}

export default notifications;