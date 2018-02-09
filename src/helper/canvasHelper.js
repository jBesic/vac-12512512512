const RECTANGLE = 'RECTANGLE';
const TRIANGLE = 'TRIANGLE';
const LINE = 'LINE';
const POLYGON = 'POLYGON';
const ELLIPSE = 'ELLIPSE';
//const TEXT_INPUT = 'TEXT_INPUT';
const DELETE = 'DELETE';
const SELECT = 'SELECT';

export const tools = {
    RECTANGLE,
    TRIANGLE,
    LINE,
    POLYGON,
    ELLIPSE,
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
                borderSize: 2,
                borderColor: '#000000',
                fillColor: '#FFFFFF',
                opacity: 100,
                groupId: undefined
            };

        case tools.POLYGON:
            return {
                borderSize: 2,
                borderColor: '#000000',
                fillColor: '#FFFFFF',
                opacity: 100,
                groupId: undefined
            };

        case tools.TRIANGLE:
            return {
                borderSize: 2,
                borderColor: '#000000',
                fillColor: '#FFFFFF',
                opacity: 100,
                groupId: undefined
            };

        case tools.ELLIPSE:
            return {
                borderSize: 2,
                borderColor: '#000000',
                fillColor: '#FFFFFF',
                opacity: 100,
                groupId: undefined
            };

        case tools.LINE:
            return {
                borderSize: 2,
                borderColor: '#000000',
                opacity: 100,
                groupId: undefined
            };

        default:
            return null;
    }
};
