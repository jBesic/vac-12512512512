import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    createCompetition: false,
    editCompetition: false,
    startCompetition: false,
    isFetching: false,
    competitions: [],
    started: {},
    manageCompetitionId: '',
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
                startCompetition: action.component === 'start' ? action.show : false,
                manageCompetitionId: action.component !== 'create' && action.competitionId && (action.component === 'start' || action.component === 'edit') ? action.competitionId : '',
            }

        case actionTypes.ASYNC_COMPETITION_REQUEST:
            return {
                ...state,
                message: '',
                isFetching: true
            };

        case actionTypes.ASYNC_COMPETITION_SUCCESS:
            let newCompetitions = [];

            if (action.competitions.hasOwnProperty('id')) {
                newCompetitions = state.competitions.filter(competition => {
                    return competition.id !== action.competitions.id
                });

                newCompetitions.push(action.competitions);
            } else {
                Object.keys(action.competitions).reduce((accumulator, competitionKey) => {
                    if (typeof action.competitions[competitionKey] === 'object') {
                        newCompetitions.push(action.competitions[competitionKey]);
                    }
                    return newCompetitions;
                }, newCompetitions);
            }

            if (newCompetitions.length === 0) {
                newCompetitions = [...state.competitions];
            }

            return {
                ...state,
                message: '',
                isFetching: false,
                competitions: [...newCompetitions.sort((competitionA, competitionB) => {
                    return competitionA.id - competitionB.id
                })]
            };

        case actionTypes.ASYNC_COMPETITION_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };

        case actionTypes.START_COMPETITION:
            const now = new Date();
            const startDate = new Date(action.competitionDetails.startDate);
            if (now > startDate) {
                return {
                    ...state,
                    message: 'Sorry, the competition draw phase is end.'
                }
            }
            return {
                ...state,
                started: action.competitionDetails
            }

        case actionTypes.UPDATE_RESET_CANVAS_LOCAL_STATE_FIELD:
            return {
                ...state,
                started: {},
                manageCompetitionId: ''
            };

        default:
            return state;
    }
}

export default competitions;