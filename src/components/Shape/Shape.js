import React from 'react';
import { tools } from '../../helper/canvasHelper';
import Draggable from 'react-draggable';


let style = {
    stroke: 'black',
    strokeWidth: '2px',
    fill: 'white'
};

const Shape = (props) => {
    let shape = [];
    if (props.type === tools.RECTANGLE || props.type === tools.TRIANGLE || props.type === tools.POLYGON) {
        shape = <polyline
            onClick={props.onClickHandler ? props.onClickHandler : () => { }}
            points={props.points.join(' ')}
            className={props.class}
            style={props.style ? props.style : style} />;
    }

    if (props.type === tools.ELLIPSE) {
        if (!props.points.length) {
            return [];
        }
        let centerCoords = props.points[0].split(',');
        let rx = props.points[1];
        let ry = props.points[2];
        shape = <ellipse
            onClick={props.onClickHandler ? props.onClickHandler : () => { }}
            cx={centerCoords[0]}
            cy={centerCoords[1]}
            rx={rx}
            ry={ry}
            className={props.class}
            style={props.style ? props.style : style} />
    }

    if (props.type === tools.CIRCLE) {
        if (!props.points.length) {
            return [];
        }
        let centerCoords = props.points[0].split(',');
        let radius = props.points[1];
        shape = <circle
            onClick={props.onClickHandler ? props.onClickHandler : () => { }}
            cx={centerCoords[0]}
            cy={centerCoords[1]}
            r={radius}
            className={props.class}
            style={props.style ? props.style : style} />
    }

    if (props.type === tools.LINE) {
        if (!props.points.length) {
            return [];
        }
        let point1 = props.points[0].split(',');
        let point2 = props.points[1].split(',');
        shape = <line
            onClick={props.onClickHandler ? props.onClickHandler : () => { }}
            x1={point1[0]}
            y1={point1[1]}
            x2={point2[0]}
            y2={point2[1]}
            className={props.class}
            style={props.style ? props.style : style} />;
    }

    if (props.isDraggable === true) {
        let output = <Draggable
        axis={props.axis ? props.axis : 'both'}
        position={props.position ? props.position : { x: 0, y: 0 }}
        onStart={props.handleStart}
        onDrag={props.handleDrag}
        onStop={props.handleStop}>{shape}</Draggable>;
        return output;
    }

    return shape;
};

export default Shape;