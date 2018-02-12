import React from 'react';
import { connect } from 'react-redux';

import { mode, tools } from '../../helper/canvasHelper';
import {
    moveShapeOtherGroup,
    moveShapeElement
} from '../../store/actions/actions';
import * as actionTypes from '../../store/actions/actionTypes';

import bringForward from '../../assets/images/bring-to-forward.svg';
import sendToBack from '../../assets/images/send-to-back.svg';
import moveDown from '../../assets/images/move-down.svg';
import moveUp from '../../assets/images/move-up.svg';

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
                        <label>{props.shape.type === tools.TEXT_INPUT ? 'Text Color' : 'Fill Color'}</label>
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
                let matchedGroup = props.groupsSettings.groups.find(group => {
                    return group.shapeIds.indexOf(props.shape.id) !== -1;
                });

                return (
                    <div key='groupId' className='shape-properties-wrapper mb-2'>
                        <label>Group</label>
                        <select
                            className="form-control"
                            value={matchedGroup.id}
                            onChange={ev => props.moveShapeOtherGroup(props.shape.id, ev.target.value)} >
                            {props.groupsSettings.groups.map(group => {
                                return <option
                                    key={group.id}
                                    value={group.id}>{group.id} Group</option>
                            })}
                        </select>
                    </div >
                );

            case 'text':
                return (
                    <div key='bucket' className='shape-properties-wrapper mb-2'>
                        <label>Text</label>
                        <input
                            className="form-control"
                            type='text'
                            value={props.shape.text}
                            onChange={ev => props.changeText(ev.target.value)} />
                    </div>
                );

            case 'fontSize':
                return (
                    <div key='fontSize' className='shape-properties-wrapper mb-2'>
                        <label>Font Size</label>
                        <input
                            className="form-control"
                            type='number'
                            value={props.shape.attributes.fontSize}
                            onChange={ev => props.updateShapeProps('fontSize', ev.target.value)}
                            min='1' max='100' step='1' />
                    </div>
                );

            default:
                return null;
        }
    }

    if (props.mode === mode.SELECT_MODE && props.shape.id) {
        return <div className='row shape-properties'>
            <div className='col-md-12 mb-3'>
                <div className="alert alert-secondary m-0 p-1">
                    Properties
                    </div>
            </div>
            <div className='col-md-12 mb-3 text-right'>
                <span
                    onClick={() => { props.moveShapeElementDispatch(actionTypes.SHAPE_BRING_ONE_LEVEL, props.shape.id) }}
                    className='btn group-controll'>
                    <img alt='Controll button' title='Bring to front one level' className="img-fluid" src={moveUp} />
                </span>
                <span
                    onClick={() => { props.moveShapeElementDispatch(actionTypes.SHAPE_SEND_ONE_LEVEL, props.shape.id) }}
                    className='btn group-controll'>
                    <img alt='Controll button' title='Send to back one level' className="img-fluid" src={moveDown} />
                </span>
                <span
                    onClick={() => { props.moveShapeElementDispatch(actionTypes.SHAPE_BRING_TO_TOP, props.shape.id) }}
                    className='btn group-controll'>
                    <img alt='Controll button' title='Bring in front of all groups' className="img-fluid" src={bringForward} />
                </span>
                <span
                    onClick={() => { props.moveShapeElementDispatch(actionTypes.SHAPE_SEND_TO_BACK, props.shape.id) }}
                    className='btn group-controll'>
                    <img alt='Controll button' title='Send behind all groups' className="img-fluid" src={sendToBack} />
                </span>
            </div>
            <div className='col-md-12 mb-3'>
                {Object.keys(props.shape.attributes).map(attribute => {
                    return getPropertyType(attribute);
                })}
            </div>
        </div >;
    }

    if (props.mode === mode.PAINT_MODE) {
        return <div className='row shape-properties'>
            <div className='col-md-12 mb-3'>
                <div key='bucket' className='shape-properties-wrapper mb-2'>
                    <label>Fill Color</label>
                    <input
                        className="form-control"
                        type='color'
                        value={props.selectedColor}
                        onChange={ev => props.changeBucketColor(ev.target.value)} />
                </div>
            </div>
        </div >;
    }
    return [];
};

function mapStateToProps(state) {
    return {
        groupsSettings: state.groupsSettings
    }
}

function mapDispatchToProps(dispatch) {
    return {
        moveShapeElementDispatch: (type, shapeId) => dispatch(moveShapeElement(type, shapeId)),
        moveShapeOtherGroup: (shapeId, newGroupId) => dispatch(moveShapeOtherGroup(shapeId, newGroupId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShapeProperties);
