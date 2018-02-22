import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    selectedUser: {},
    selectedCompetition: {},
    votes: [],
    isFetching: false,
    message: ''
};

function gallery(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.ASYNC_GALLERY_REQUEST: return {...state, isFetching: true};
        case actionTypes.ASYNC_GALLERY_SUCCESS: return galleryRequestSuccess(state, action.data, action.galleryType);
        case actionTypes.ASYNC_VOTE_REQUEST_SUCCESS: return {...state, isFetching: false, votes: action.votes};
        case actionTypes.ASYNC_GALLERY_FAILURE: return {...state, isFetching: false, message: action.message};
        default:
            return state;
    }
}

function galleryRequestSuccess(state, data, galleryType) {
    if (galleryType === 'USER') {
        return {...state, isFetching: false, selectedUser: data};
    }
    return {...state, isFetching: false, selectedCompetition: data};
}

export default gallery;