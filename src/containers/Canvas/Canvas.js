import React, { Component } from 'react';

import './Canvas.css';

class Canvas extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <div className='row canvas'>
                            <div className='col-md-12'>
                                {/* *** Canvas Title *** */}
                                <div className='row canvas__title'>
                                    <div className='col-md-12' >Draw for competiton: Competition Name</div>
                                </div>
                                {/* *** Canvas Content Header *** */}
                                <div className='row d-flex'>
                                    <div className='col-md-4'>
                                        <input type="text" className="form-control" placeholder='Enter a name of your art...' />
                                    </div>
                                    <div className='col-md-6 text-center'>
                                        <div className="alert alert-light  m-0 p-1">
                                            Remaining time: <strong>2:33 min</strong>
                                        </div>
                                    </div>
                                    <div className='col-md-2'><button type="button" className="btn vac-btn-primary canvas__save-button">Save</button></div>
                                </div>
                                {/* *** Canvas Content Body  *** */}
                                <div className='row canvas__content-body mt-10'>
                                    <div className='col-md-2 canvas__toolbox'>Toolbox</div>
                                    <div className='col-md-8 canvas__draw-place'>Canvas</div>
                                    <div className='col-md-2 canvas__groups'>Groups</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Canvas;