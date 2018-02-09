import React from 'react';
import { tools } from '../../helper/canvasHelper';

let style = {
    stroke: 'black',
    strokeWidth: '2px',
    fill: 'white'
};

const Shape = (props) => {
    if (props.type === tools.RECTANGLE || props.type === tools.TRIANGLE || props.type === tools.POLYGON) {
        return <polyline
            onClick={props.onClickHandler ? props.onClickHandler : () => { }}
            points={props.points.join(' ')}
            className={props.class}
            style={props.style ? props.style : style} />;
    }

    if (props.type === tools.ELLIPSE) {
        return props.points.length &&
            <ellipse
                onClick={props.onClickHandler ? props.onClickHandler : () => { }}
                cx={props.points[0]}
                cy={props.points[1]}
                rx={props.points[2]}
                ry={props.points[3]}
                className={props.class}
                style={props.style ? props.style : style} />
    }

    if (props.type === tools.LINE) {
        return props.points.length &&
            <line
                onClick={props.onClickHandler ? props.onClickHandler : () => { }}
                x1={props.points[0]}
                y1={props.points[1]}
                x2={props.points[2]}
                y2={props.points[3]}
                className={props.class}
                style={props.style ? props.style : style} />;
    }

    return [];
};

export default Shape;