import * as actionTypes from '../actions/actionTypes';

const initState = {
    selectedGroupId: 0,
    groups: [
        {
            id: 0,
            weight: 0,
            shapeIds: []
        }
    ]
};

const groups = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_ELEMENT: {
            if (state.selectedGroupId === action.elementId) {
                return state;
            }

            return {
                ...state,
                selectedGroupId: action.elementId
            };
        }

        case actionTypes.BRING_ONE_LEVEL: {
            const newGroups = [...state.groups];
            const indexInArray = newGroups.findIndex(group => {
                return group.id === state.selectedGroupId;
            });

            if (indexInArray === 0) {
                return state;
            }

            const firstPortion = newGroups.slice(0, indexInArray);
            const secondPortion = newGroups.slice(indexInArray, newGroups.length);
            const aboveElement = firstPortion.pop();
            const selectedElement = secondPortion.shift();

            return {
                ...state,
                groups: [
                    ...firstPortion,
                    selectedElement,
                    aboveElement,
                    ...secondPortion
                ]
            };
        }

        case actionTypes.SEND_ONE_LEVEL: {
            const newGroups = [...state.groups];
            const indexInArray = newGroups.findIndex(group => {
                return group.id === state.selectedGroupId;
            });

            if (indexInArray === newGroups.length - 1) {
                return state;
            }

            const firstPortion = newGroups.slice(0, indexInArray);
            const secondPortion = newGroups.slice(indexInArray, newGroups.length);
            const selectedElement = secondPortion.shift();
            const behindElement = secondPortion.shift();

            return {
                ...state,
                groups: [
                    ...firstPortion,
                    behindElement,
                    selectedElement,
                    ...secondPortion
                ]
            };
        }

        case actionTypes.BRING_TO_TOP: {
            const newGroups = [...state.groups];
            const indexInArray = newGroups.findIndex(group => {
                return group.id === state.selectedGroupId;
            });

            if (indexInArray === 0) {
                return state;
            }

            const firstPortion = newGroups.slice(0, indexInArray);
            const secondPortion = newGroups.slice(indexInArray, newGroups.length);
            const selectedElement = secondPortion.shift();

            return {
                ...state,
                groups: [
                    selectedElement,
                    ...firstPortion,
                    ...secondPortion
                ]
            };
        }

        case actionTypes.SEND_TO_BACK: {
            const newGroups = [...state.groups];
            const indexInArray = newGroups.findIndex(group => {
                return group.id === state.selectedGroupId;
            });

            if (indexInArray === newGroups.length - 1) {
                return state;
            }

            const firstPortion = newGroups.slice(0, indexInArray);
            const secondPortion = newGroups.slice(indexInArray, newGroups.length);
            const selectedElement = secondPortion.shift();

            return {
                ...state,
                groups: [
                    ...firstPortion,
                    ...secondPortion,
                    selectedElement
                ]
            };
        }

        case actionTypes.ADD_GROUP: {
            const newGroups = [...state.groups];
            const lastUsedId = newGroups.reduce((accumulator, currentValue) => {
                return Math.max(accumulator, currentValue.id);
            }, 0);

            newGroups.push({
                id: lastUsedId + 1,
                weight: 0,
                shapeIds: []
            });

            return {
                ...state,
                groups: newGroups,
                selectedGroupId: lastUsedId + 1
            };
        }
        case actionTypes.DELETE_GROUP: {
            if (state.groups.length === 1) {
                return state;
            }

            const newGroups = state.groups.filter((group, indexInArray) => {
                return group.id !== state.selectedGroupId;
            });

            return {
                ...state,
                groups: newGroups,
                selectedGroupId: newGroups[0].id
            };
        }

        default:
            return state;
    }
};

export default groups;