const RECTANGLE = 'RECTANGLE';
const TRIANGLE = 'TRIANGLE';
const LINE = 'LINE';
const POLYGON = 'POLYGON';
const ELLIPSE = 'ELLIPSE';
const CIRCLE = 'CIRCLE';
const TEXT_INPUT = 'TEXT_INPUT';
const DELETE = 'DELETE';
const SELECT = 'SELECT';

export const tools = {
    RECTANGLE,
    TRIANGLE,
    LINE,
    POLYGON,
    ELLIPSE,
    CIRCLE,
    TEXT_INPUT,
    DELETE,
    SELECT
};

const SELECT_MODE = 'SELECT_MODE';
const DRAW_MODE = 'DRAW_MODE';
const DELETE_MODE = 'DELETE_MODE';
const PAINT_MODE = 'PAINT_MODE';

export const mode = {
    SELECT_MODE,
    DRAW_MODE,
    DELETE_MODE,
    PAINT_MODE
};

export const defaultShapeAttributes = function (shapeType) {
    switch (shapeType) {
        case tools.RECTANGLE:
            return {
                strokeWidth: 2,
                stroke: '#000000',
                fill: '#FFFFFF',
                opacity: 1,
                groupId: undefined
            };

        case tools.POLYGON:
            return {
                strokeWidth: 2,
                stroke: '#000000',
                fill: '#FFFFFF',
                opacity: 1,
                groupId: undefined
            };

        case tools.TRIANGLE:
            return {
                strokeWidth: 2,
                stroke: '#000000',
                fill: '#FFFFFF',
                opacity: 1,
                groupId: undefined
            };

        case tools.ELLIPSE:
            return {
                strokeWidth: 2,
                stroke: '#000000',
                fill: '#FFFFFF',
                opacity: 1,
                groupId: undefined
            };

        case tools.CIRCLE:
            return {
                strokeWidth: 2,
                stroke: '#000000',
                fill: '#FFFFFF',
                opacity: 1,
                groupId: undefined
            };

        case tools.LINE:
            return {
                strokeWidth: 2,
                stroke: '#000000',
                opacity: 1,
                groupId: undefined,
                cursor: 'pointer'
            };

        default:
            return null;
    }
};
