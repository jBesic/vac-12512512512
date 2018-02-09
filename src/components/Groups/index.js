import React, { Component } from 'react';
import { connect } from 'react-redux';

import bringForward from '../../assets/images/bring-to-forward.svg';
import sendToBack from '../../assets/images/send-to-back.svg';
import moveDown from '../../assets/images/move-down.svg';
import moveUp from '../../assets/images/move-up.svg';
import newFile from '../../assets/images/new-file.svg';
import deleteElement from '../../assets/images/delete.svg';
import group from '../../assets/images/group.svg';

import './Groups.css';

class Groups extends Component {
    constructor(props) {
        super();
    }

    handleControllButton(controll) {
        console.log(controll);
    }

    render() {
        return (
            <div className='row groups-panel'>
                <div className='col-md-12 mb-3'>
                    <div className="alert alert-secondary text-center m-0 p-1">
                        Groups
                    </div>
                </div>
                <div className='col-md-12 text-right mb-3'>
                    <span
                        onClick={() => { this.handleControllButton('move-up'); }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Bring to front one level' className="img-fluid" src={moveUp} />
                    </span>
                    <span
                        onClick={() => { this.handleControllButton('move-down'); }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Send to back one level' className="img-fluid" src={moveDown} />
                    </span>
                    <span
                        onClick={() => { this.handleControllButton('bring-to-top'); }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Bring in front of all groups' className="img-fluid" src={bringForward} />
                    </span>
                    <span
                        onClick={() => { this.handleControllButton('send-to-bottom'); }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Send behind all groups' className="img-fluid" src={sendToBack} />
                    </span>
                </div>
                <div className='col-md-12'>
                    <ul className="list-group list-group-flush vac-list-group">
                        <li className="btn list-group-item"><img alt='Group' className="img-fluid" src={group} /> Group 1</li>
                        <li className="btn list-group-item active"><img alt='Group' className="img-fluid" src={group} /> Group 2</li>
                        <li className="btn list-group-item"><img alt='Group' className="img-fluid" src={group} /> Group 3</li>
                        <li className="btn list-group-item"><img alt='Group' className="img-fluid" src={group} /> Group 4</li>
                        <li className="btn list-group-item"><img alt='Group' className="img-fluid" src={group} /> Group 5</li>
                    </ul>
                </div>
                <div className='col-md-12 text-right'>
                    <span
                        onClick={() => { this.handleControllButton('add-new'); }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Add new Group' className="img-fluid" src={newFile} />
                    </span>
                    <span
                        onClick={() => { this.handleControllButton('delete-element'); }}
                        className='btn group-controll'>
                        <img alt='Controll button' title='Delete selected Group' className="img-fluid" src={deleteElement} />
                    </span>
                </div>
            </div >
        );
    }
};

export default connect(null, null)(Groups);