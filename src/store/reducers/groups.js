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

        case actionTypes.SEND_ONE_LEVEL: {
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

        case actionTypes.BRING_ONE_LEVEL: {
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

        case actionTypes.SEND_TO_BACK: {
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

        case actionTypes.BRING_TO_TOP: {
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

        case actionTypes.ADD_SHAPE_TO_GROUP: {
            const newGroups = [...state.groups];
            const indexInArray = newGroups.findIndex(group => {
                return group.id === state.selectedGroupId;
            });

            newGroups[indexInArray] = {
                ...newGroups[indexInArray],
                shapeIds: [
                    ...newGroups[indexInArray].shapeIds,
                    action.shapeId
                ]
            };

            return {
                ...state,
                groups: newGroups
            };
        }

        case actionTypes.DELETE_SHAPE_FROM_GROUP: {
            const newGroups = [...state.groups];
            const indexInArray = newGroups.findIndex(group => {
                return group.shapeIds.indexOf(action.shapeId) !== -1;
            });

            const indexOfShapeInArray = newGroups[indexInArray].shapeIds.indexOf(action.shapeId);
            const splicedShapeIdsArray = [...newGroups[indexInArray].shapeIds];
            splicedShapeIdsArray.splice(indexOfShapeInArray, 1);

            newGroups[indexInArray] = {
                ...newGroups[indexInArray],
                shapeIds: splicedShapeIdsArray
            };

            return {
                ...state,
                groups: newGroups
            };
        }

        case actionTypes.MOVE_SHAPE_TO_OTHER_GROUP: {
            const newGroups = [...state.groups];
            const indexInArray = newGroups.findIndex(group => {
                return group.shapeIds.indexOf(action.shapeId) !== -1;
            });

            const indexOfShapeInArray = newGroups[indexInArray].shapeIds.indexOf(action.shapeId);
            const splicedShapeIdsArray = [...newGroups[indexInArray].shapeIds];
            splicedShapeIdsArray.splice(indexOfShapeInArray, 1);

            const indexInArrayNewGroup = newGroups.findIndex(group => {
                return group.id === Number.parseInt(action.newGroupId, 10);
            });

            newGroups[indexInArray] = {
                ...newGroups[indexInArray],
                shapeIds: splicedShapeIdsArray
            }

            newGroups[indexInArrayNewGroup] = {
                ...newGroups[indexInArrayNewGroup],
                shapeIds: [
                    ...newGroups[indexInArrayNewGroup].shapeIds,
                    action.shapeId
                ]
            }

            return {
                ...state,
                groups: newGroups,
                selectedGroupId: Number.parseInt(action.newGroupId, 10)
            };
        }

        case actionTypes.SHAPE_SEND_ONE_LEVEL: {
            const newGroups = [...state.groups];
            const indexInArray = newGroups.findIndex(group => {
                return group.id === state.selectedGroupId;
            });

            const newGroup = { ...newGroups[indexInArray] };
            const shapeIndexInArray = newGroup.shapeIds.indexOf(action.shapeId);

            if (shapeIndexInArray === 0) {
                return state;
            }

            newGroups[indexInArray] = newGroup;
            let shapeIds = [...newGroup.shapeIds];
            const firstPortion = shapeIds.slice(0, shapeIndexInArray);
            const secondPortion = shapeIds.slice(shapeIndexInArray, shapeIds.length);
            const aboveElement = firstPortion.pop();
            const selectedElement = secondPortion.shift();

            shapeIds = [
                ...firstPortion,
                selectedElement,
                aboveElement,
                ...secondPortion
            ];

            newGroup.shapeIds = shapeIds;
            return {
                ...state,
                groups: [
                    ...newGroups
                ]
            };
        }

        case actionTypes.SHAPE_BRING_ONE_LEVEL: {
            const newGroups = [...state.groups];
            const indexInArray = newGroups.findIndex(group => {
                return group.id === state.selectedGroupId;
            });

            const newGroup = { ...newGroups[indexInArray] };
            const shapeIndexInArray = newGroup.shapeIds.indexOf(action.shapeId);
            if (shapeIndexInArray === newGroup.shapeIds.length - 1) {
                return state;
            }

            newGroups[indexInArray] = newGroup;
            let shapeIds = [...newGroup.shapeIds];
            const firstPortion = shapeIds.slice(0, shapeIndexInArray);
            const secondPortion = shapeIds.slice(shapeIndexInArray, shapeIds.length);
            const selectedElement = secondPortion.shift();
            const behindElement = secondPortion.shift();

            shapeIds = [
                ...firstPortion,
                behindElement,
                selectedElement,
                ...secondPortion
            ];

            newGroup.shapeIds = shapeIds;
            return {
                ...state,
                groups: [
                    ...newGroups
                ]
            };
        }

        case actionTypes.SHAPE_BRING_TO_TOP: {
            const newGroups = [...state.groups];
            const indexInArray = newGroups.findIndex(group => {
                return group.id === state.selectedGroupId;
            });

            const newGroup = { ...newGroups[indexInArray] };
            const shapeIndexInArray = newGroup.shapeIds.indexOf(action.shapeId);
            if (shapeIndexInArray === newGroup.shapeIds.length - 1) {
                return state;
            }

            newGroups[indexInArray] = newGroup;
            let shapeIds = [...newGroup.shapeIds];
            const firstPortion = shapeIds.slice(0, shapeIndexInArray);
            const secondPortion = shapeIds.slice(shapeIndexInArray, shapeIds.length);
            const selectedElement = secondPortion.shift();

            shapeIds = [
                ...firstPortion,
                ...secondPortion,
                selectedElement
            ];

            newGroup.shapeIds = shapeIds;
            return {
                ...state,
                groups: [
                    ...newGroups
                ]
            };
        }

        case actionTypes.SHAPE_SEND_TO_BACK: {
            const newGroups = [...state.groups];
            const indexInArray = newGroups.findIndex(group => {
                return group.id === state.selectedGroupId;
            });

            const newGroup = { ...newGroups[indexInArray] };
            const shapeIndexInArray = newGroup.shapeIds.indexOf(action.shapeId);
            if (shapeIndexInArray === 0) {
                return state;
            }

            newGroups[indexInArray] = newGroup;
            let shapeIds = [...newGroup.shapeIds];
            const firstPortion = shapeIds.slice(0, shapeIndexInArray);
            const secondPortion = shapeIds.slice(shapeIndexInArray, shapeIds.length);
            const selectedElement = secondPortion.shift();

            shapeIds = [
                selectedElement,
                ...firstPortion,
                ...secondPortion
            ];

            newGroup.shapeIds = shapeIds;
            return {
                ...state,
                groups: [
                    ...newGroups
                ]
            };
        }

        default:
            return state;
    }
};

export default groups;