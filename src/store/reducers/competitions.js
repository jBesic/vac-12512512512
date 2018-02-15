import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    createCompetition: false,
    editCompetition: false,
    startCompetition: false,
    isFetching: false,
    competitions: [],
    started: {},
    message: '',
};

function competitions(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.COMPETITION_MODAL:
            return {
                ...state,
                message: '',
                createCompetition: action.component === 'create' ? action.show : false,
                editCompetition: action.component === 'edit' ? action.show : false,
                startCompetition: action.component === 'start' ? action.show : false
            }

        case actionTypes.ASYNC_COMPETITION_REQUEST:
            return {
                ...state,
                message: '',
                isFetching: true
            };

        case actionTypes.ASYNC_COMPETITION_SUCCESS:
            let newCompetitions = [];
            if (Array.isArray(action.competitions)) {
                newCompetitions = action.competitions;
            } else if (action.competitions.hasOwnProperty('id')) {
                newCompetitions = [...state.competitions, action.competitions];
            } else {
                newCompetitions = Object.keys(action.competitions).map(competitionKey => {
                    return action.competitions[competitionKey];
                })
            }

            return {
                ...state,
                message: '',
                isFetching: false,
                competitions: [...newCompetitions]
            };

        case actionTypes.ASYNC_COMPETITION_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };

        case actionTypes.START_COMPETITION:
            return {
                ...state,
                started: action.competitionDetails
            }

        default:
            return state;
    }
}

export default competitions;