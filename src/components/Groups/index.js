import React from 'react';
import { connect } from 'react-redux';

import {
    addGroup,
    deleteGroup,
    moveElement,
    selectElement,
    deleteShapes
} from '../../store/actions/actions';
import * as actionTypes from '../../store/actions/actionTypes';
import { mode } from '../../helper/canvasHelper';

import bringForward from '../../assets/images/bring-to-forward.svg';
import sendToBack from '../../assets/images/send-to-back.svg';
import moveDown from '../../assets/images/move-down.svg';
import moveUp from '../../assets/images/move-up.svg';
import newFile from '../../assets/images/new-file.svg';
import deleteElement from '../../assets/images/delete.svg';
import groupElement from '../../assets/images/group.svg';

import './Groups.css';

const Groups = function (props) {
    return (
        <div className="card">
            <div className="card-header vac-card-header">
                Groups
            </div>
            <div className="card-body">
                <div className='mb-3 text-right'>
                    <span
                        onClick={() => {
                            if (props.activeMode === mode.DRAW_MODE) {
                                return true;
                            }

                            props.unselectShapeHandler();
                            props.addGroupDispatch();
                        }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Add new Group' className="img-fluid" src={newFile} />
                    </span>
                    <span
                        onClick={() => {
                            if (props.activeMode === mode.DRAW_MODE) {
                                return true;
                            }

                            props.unselectShapeHandler();
                            if (props.groupsSettings.groups.length > 1) {
                                const indexOfGroupInArray = props.groupsSettings.groups.findIndex(group => {
                                    return group.id === props.groupsSettings.selectedGroupId;
                                });
                                props.deleteShapesDispatch(props.groupsSettings.groups[indexOfGroupInArray].shapeIds);
                                props.deleteGroupDispatch();
                            }
                        }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Delete selected Group' className="img-fluid" src={deleteElement} />
                    </span>
                </div>
                <div className='mb-3'>
                    <ul className="list-group list-group-flush vac-list-group">
                        {props.groupsSettings.groups.map(group => {
                            const isActive = props.groupsSettings.selectedGroupId === group.id;

                            return (
                                <li
                                    key={group.id}
                                    onClick={() => {
                                        if (props.activeMode === mode.DRAW_MODE) {
                                            return true;
                                        }

                                        props.unselectShapeHandler();
                                        props.selectElementDispatch(group.id);
                                    }}
                                    className={"btn list-group-item" + (isActive ? ' active' : '')}>
                                    <img alt='Group' className="img-fluid" src={groupElement} /> {group.id} Group
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className='text-right'>
                    <span
                        onClick={() => {
                            if (props.activeMode === mode.DRAW_MODE) {
                                return true;
                            }

                            props.unselectShapeHandler();
                            props.moveElementDispatch(actionTypes.BRING_ONE_LEVEL);
                        }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Bring to front one level' className="img-fluid" src={moveUp} />
                    </span>
                    <span
                        onClick={() => {
                            if (props.activeMode === mode.DRAW_MODE) {
                                return true;
                            }

                            props.unselectShapeHandler();
                            props.moveElementDispatch(actionTypes.SEND_ONE_LEVEL);
                        }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Send to back one level' className="img-fluid" src={moveDown} />
                    </span>
                    <span
                        onClick={() => {
                            if (props.activeMode === mode.DRAW_MODE) {
                                return true;
                            }

                            props.unselectShapeHandler();
                            props.moveElementDispatch(actionTypes.BRING_TO_TOP);
                        }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Bring in front of all groups' className="img-fluid" src={bringForward} />
                    </span>
                    <span
                        onClick={() => {
                            if (props.activeMode === mode.DRAW_MODE) {
                                return true;
                            }

                            props.unselectShapeHandler();
                            props.moveElementDispatch(actionTypes.SEND_TO_BACK);
                        }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Send behind all groups' className="img-fluid" src={sendToBack} />
                    </span>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        groupsSettings: { ...state.groupsSettings }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addGroupDispatch: () => dispatch(addGroup()),
        deleteGroupDispatch: () => dispatch(deleteGroup()),
        moveElementDispatch: (type) => dispatch(moveElement(type)),
        selectElementDispatch: (elementId) => dispatch(selectElement(elementId)),
        deleteShapesDispatch: (shapeIds) => dispatch(deleteShapes(shapeIds))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);