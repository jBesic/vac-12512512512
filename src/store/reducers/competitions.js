import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    createCompetition: false,
    editCompetition: false,
    isFetching: false,
    competitions: [],
    message: '',
};

function competitions(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.CREATE_EDIT_COMPETITION_MODAL:
            return {
                ...state,
                message: '',
                createCompetition: action.component === 'create' ? action.show : false,
                editCompetition: action.component === 'edit' ? action.show : false
            }

        case actionTypes.CREATE_EDIT_COMPETITION_REQUEST:
            return {
                ...state,
                message: '',
                isFetching: true
            };

        case actionTypes.CREATE_EDIT_COMPETITION_SUCCESS:
            console.log(action.competition)
            return {
                ...state,
                message: '',
                isFetching: false,
                competitions: [...state.competitions, action.competition]
            };

        case actionTypes.CREATE_EDIT_COMPETITION_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };

        default:
            return state;
    }
}

export default competitions;