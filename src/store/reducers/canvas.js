import * as actionTypes from '../actions/actionTypes';

const initState = {
    shapes: [],
    lastUsedId: 0
};

const canvas = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SHAPE: return addUpdateShape(state, action.shape);
        case actionTypes.UPDATE_SHAPE: return addUpdateShape(state, action.shape);
        case actionTypes.DELETE_SHAPE: return deleteShape(state, action.shape);
        case actionTypes.DELETE_SHAPES: return deleteShapes(state, action.shapeIds);
        default:
            return {
                ...state
            };
    }
}

export default canvas;

function addUpdateShape(state, shape) {
    let shapes = [...state.shapes];
    let tempShape = shapes.find(item => item.id === shape.id);
    if (tempShape) {
        let newShapes = shapes.filter(item => item.id !== shape.id);
        newShapes.push(shape);
        newShapes.sort(function (prevShape, nextShape) {
            return prevShape.id - nextShape.id;
        });
        return {
            ...state,
            shapes: newShapes
        };
    }
    shapes.push(shape);
    return {
        ...state,
        shapes,
        lastUsedId: state.lastUsedId + 1
    };
}

function deleteShape(state, shape) {
    let shapes = state.shapes.filter(item => item.id !== shape.id);
    return {
        ...state,
        shapes
    };
}

function deleteShapes(state, shapeIds) {
    const shapes = state.shapes.filter(shape => {
        return shapeIds.indexOf(shape.id) === -1;
    });

    return {
        ...state,
        shapes
    }
}