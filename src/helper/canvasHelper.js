const RECTANGLE = 'RECTANGLE';
const TRIANGLE = 'TRIANGLE';
const LINE = 'LINE';
const POLYGON = 'POLYGON';
const ELLIPSE = 'ELLIPSE';
const CIRCLE = 'CIRCLE';
const TEXT_INPUT = 'TEXT_INPUT';
const DELETE = 'DELETE';
const SELECT = 'SELECT';
const BUCKET = 'BUCKET';

export const tools = {
    RECTANGLE,
    TRIANGLE,
    LINE,
    POLYGON,
    ELLIPSE,
    CIRCLE,
    TEXT_INPUT,
    DELETE,
    SELECT,
    BUCKET
};

const SELECT_MODE = 'SELECT_MODE';
const DRAW_MODE = 'DRAW_MODE';
const DELETE_MODE = 'DELETE_MODE';
const PAINT_MODE = 'PAINT_MODE';
const TEXT_MODE = 'TEXT_MODE';
const UNDO_MODE = 'UNDO_MODE';
const REDO_MODE = 'REDO_MODE';

export const mode = {
    SELECT_MODE,
    DRAW_MODE,
    DELETE_MODE,
    PAINT_MODE,
    TEXT_MODE,
    UNDO_MODE,
    REDO_MODE
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

        case tools.TEXT_INPUT:
            return {
                text: undefined,
                fontSize: '12',
                fill: '#000000',
                groupId: undefined
            };

        default:
            return null;
    }
};

function getControlPointsForRectangle(referencePoint, newPoint) {
    let points = [referencePoint.x + ',' + referencePoint.y];
    points.push(newPoint.x + ',' + referencePoint.y);
    points.push(newPoint.x + ',' + newPoint.y);
    points.push(referencePoint.x + ',' + newPoint.y);
    points.push(referencePoint.x + ',' + referencePoint.y);

    return points;
}

function getControlPointsForTriangle(referencePoint, newPoint) {
    let points = [referencePoint.x + ',' + referencePoint.y];
    points.push(newPoint.x + ',' + referencePoint.y);
    points.push(newPoint.x + ',' + newPoint.y);
    points.push(referencePoint.x + ',' + referencePoint.y);

    return points;
}

function getControlPointsForEllipse(referencePoint, newPoint) {
    let rx = Math.abs((newPoint.x - referencePoint.x) / 2);
    let ry = Math.abs((newPoint.y - referencePoint.y) / 2);
    let cx = newPoint.x - rx;
    if (referencePoint.x > newPoint.x) {
        cx = referencePoint.x - rx;
    }
    let cy = newPoint.y - ry;
    if (referencePoint.y > newPoint.y) {
        cy = referencePoint.y - ry;
    }

    let centerCoords = cx + ',' + cy;
    let points = [centerCoords, rx, ry];

    return points;
}

function getControlPointsForCircle(referencePoint, newPoint) {
    let r = Math.abs((newPoint.x - referencePoint.x) / 2);
    let cx = newPoint.x - r;
    if (referencePoint.x > newPoint.x) {
        cx = referencePoint.x - r;
    }
    let cy = referencePoint.y;

    let centerCoords = cx + ',' + cy;
    let points = [centerCoords, r];

    return points;
}

function getControlPointsForLine(referencePoint, newPoint) {
    let point1 = referencePoint.x + ',' + referencePoint.y;
    let point2 = newPoint.x + ',' + newPoint.y;
    let points = [point1, point2];

    return points;
}

function calculateNewShapePoints(referencePoint, newPoint, points, shapeType) {
    let distanceX = newPoint.x - referencePoint.x;
    let distanceY = newPoint.y - referencePoint.y;
    let newPoints = points.map((item, index) => {
        if ((shapeType === tools.ELLIPSE || shapeType === tools.CIRCLE) && index > 0) {
            return item;
        }
        let helper = item.split(',');
        helper = helper.map(item => (Number)(item));
        helper[0] = helper[0] + distanceX;
        helper[1] = helper[1] + distanceY;
        return helper.join(',');
    });

    return newPoints;
}

export const canvasFunctions = {
    getControlPointsForRectangle,
    getControlPointsForTriangle,
    getControlPointsForEllipse,
    getControlPointsForCircle,
    getControlPointsForLine,
    calculateNewShapePoints
};
