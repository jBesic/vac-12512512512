import React from 'react';

import { mode } from '../../helper/canvasHelper';
import './shape-properties.css';

const ShapeProperties = (props) => {
    const getPropertyType = (type) => {
        switch (type) {
            case 'strokeWidth':
                return (
                    <div key='strokeWidth' className='shape-properties-wrapper mb-2'>
                        <label>Border size</label>
                        <input
                            className="form-control"
                            type='number'
                            value={props.shape.attributes.strokeWidth}
                            onChange={ev => props.updateShapeProps('strokeWidth', ev.target.value)}
                            min='0' step='1' />
                    </div>
                );

            case 'stroke':
                return (
                    <div key='stroke' className='shape-properties-wrapper mb-2'>
                        <label>Border Color</label>
                        <input
                            className="form-control"
                            type='color'
                            value={props.shape.attributes.stroke}
                            onChange={ev => props.updateShapeProps('stroke', ev.target.value)} />
                    </div>
                );

            case 'fill':
                return (
                    <div key='fill' className='shape-properties-wrapper mb-2'>
                        <label>Fill Color</label>
                        <input
                            className="form-control"
                            type='color'
                            value={props.shape.attributes.fill}
                            onChange={ev => props.updateShapeProps('fill', ev.target.value)} />
                    </div>
                );

            case 'opacity':
                return (
                    <div key='opacity' className='shape-properties-wrapper mb-2'>
                        <label>Opacity</label>
                        <input
                            className="form-control"
                            type='number'
                            value={props.shape.attributes.opacity}
                            onChange={ev => props.updateShapeProps('opacity', ev.target.value)}
                            min='0' max='1' step='0.1' />
                    </div>
                );

            case 'groupId':
                return (
                    <div key='groupId' className='shape-properties-wrapper mb-2'>
                        <label>Group</label>
                        <select
                            className="form-control"
                            value={props.shape.attributes.groupId}
                            onChange={ev => props.updateShapeProps('groupId', ev.target.value)}>
                            <option value='undefined'>No Group</option>
                        </select>
                    </div >
                );

            default:
                return null;
        }
    }

        return props.mode === mode.SELECT_MODE && props.shape.id ?
            <div className='row shape-properties'>
                <div className='col-md-12 mb-3'>
                    <div className="alert alert-secondary m-0 p-1">
                        Properties
                    </div>
                </div>
                <div className='col-md-12 mb-3'>
                    {Object.keys(props.shape.attributes).map(attribute => {
                        return getPropertyType(attribute);
                    })}
                </div>
            </div >
            : null;
};

export default ShapeProperties;