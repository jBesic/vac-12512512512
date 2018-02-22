import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    createCompetition: false,
    editCompetition: false,
    startCompetition: false,
    isFetching: false,
    competitions: [],
    draw: [],
    vote: [],
    joined: [],
    own: [],
    started: {},
    manageCompetitionId: '',
    message: '',
    modifiedDate: null
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
            let competitionStatuses = {};

            if (action.status !== null) {
                if (action.status === 'draw') {
                    competitionStatuses.draw = action.competitions.map(competition => Number.parseInt(competition.id, 10));
                } else if (action.status === 'vote') {
                    competitionStatuses.vote = action.competitions.map(competition => Number.parseInt(competition.id, 10));
                } else if (action.status === 'joined') {
                    competitionStatuses.joined = action.competitions.map(competition => Number.parseInt(competition.id, 10));
                } else {
                    competitionStatuses.own = [
                        ...state.own,
                        ...action.competitions.filter(competition => {
                            const competitionId = Number.parseInt(competition.id, 10);
                            return state.own.indexOf(competitionId) === -1;
                        }).map(newCompetition => newCompetition.id)
                    ];
                }
    
                newCompetitions = state.competitions.filter(competition => {
                    return action.competitions.findIndex(actionCompetition => {
                        return actionCompetition.id === competition.id;
                    }) === -1;
                });
    
                newCompetitions = [...newCompetitions, ...action.competitions];
            } else {
                newCompetitions = action.competitions;
            }

            return {
                ...state,
                message: '',
                isFetching: false,
                competitions: [...newCompetitions.sort((competitionA, competitionB) => {
                    return competitionA.id - competitionB.id
                })],
                ...competitionStatuses, 
                modifiedDate: new Date()
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
            if (now - startDate < action.competitionDetails.endDate * 60000) {
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