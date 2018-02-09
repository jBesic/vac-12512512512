import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    addGroup,
    deleteGroup,
    moveElement,
    selectElement,
    deleteShapes
} from '../../store/actions/actions';
import * as actionTypes from '../../store/actions/actionTypes';

import bringForward from '../../assets/images/bring-to-forward.svg';
import sendToBack from '../../assets/images/send-to-back.svg';
import moveDown from '../../assets/images/move-down.svg';
import moveUp from '../../assets/images/move-up.svg';
import newFile from '../../assets/images/new-file.svg';
import deleteElement from '../../assets/images/delete.svg';
import groupElement from '../../assets/images/group.svg';

import './Groups.css';

class Groups extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div className='row groups-panel'>
                <div className='col-md-12 mb-3'>
                    <div className="alert alert-secondary text-center m-0 p-1">
                        Groups
                    </div>
                </div>
                <div className='col-md-12 mb-3 text-right'>
                    <span
                        onClick={() => { this.props.addGroupDispatch() }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Add new Group' className="img-fluid" src={newFile} />
                    </span>
                    <span
                        onClick={() => {
                            if (this.props.groupsSettings.groups.length > 1) {
                                const indexOfGroupInArray = this.props.groupsSettings.groups.findIndex(group => {
                                    return group.id === this.props.groupsSettings.selectedGroupId;
                                });
                                this.props.deleteShapesDispatch(this.props.groupsSettings.groups[indexOfGroupInArray].shapeIds);
                                this.props.deleteGroupDispatch();
                            }
                        }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Delete selected Group' className="img-fluid" src={deleteElement} />
                    </span>
                </div>
                <div className='col-md-12 mb-3'>
                    <ul className="list-group list-group-flush vac-list-group">
                        {this.props.groupsSettings.groups.map(group => {
                            return (
                                <li
                                    key={group.id}
                                    onClick={() => { this.props.selectElementDispatch(group.id); }}
                                    className={"btn list-group-item" + (this.props.groupsSettings.selectedGroupId === group.id ? ' active' : '')}>
                                    <img alt='Group' className="img-fluid" src={groupElement} /> {group.id} Group
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className='col-md-12 text-right'>
                    <span
                        onClick={() => { this.props.moveElementDispatch(actionTypes.SEND_ONE_LEVEL) }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Bring to front one level' className="img-fluid" src={moveUp} />
                    </span>
                    <span
                        onClick={() => { this.props.moveElementDispatch(actionTypes.BRING_ONE_LEVEL) }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Send to back one level' className="img-fluid" src={moveDown} />
                    </span>
                    <span
                        onClick={() => { this.props.moveElementDispatch(actionTypes.SEND_TO_BACK) }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Bring in front of all groups' className="img-fluid" src={bringForward} />
                    </span>
                    <span
                        onClick={() => { this.props.moveElementDispatch(actionTypes.BRING_TO_TOP) }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Send behind all groups' className="img-fluid" src={sendToBack} />
                    </span>
                </div>
            </div >
        );
    }
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