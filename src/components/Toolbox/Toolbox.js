import React from 'react';
import Rectangle from '../../assets/images/rectangle.png';
import Triangle from '../../assets/images/triangle.png';
import Line from '../../assets/images/line.png';
import Polygon from '../../assets/images/polygon.png';

import './Toolbox.css'

const Toolbox = (props) => {
    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-md-12 mb-3'>
                    <div className="alert alert-secondary  m-0 p-1">
                        Toolbox
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-3 toolbox__tool'><i className='fa fa-mouse-pointer fa-2x'></i></div>
                <div className='col-md-3 toolbox__tool'><i className='fa fa-eraser fa-2x'></i></div>
            </div>
            <div className='row'>
                <div className='col-md-4 toolbox__tool' style={{ border: '1px dashed' }}><img src={Rectangle} alt='' /></div>
                <div className='col-md-4 toolbox__tool'><img src={Triangle} alt='' /></div>
            </div>
            <div className='row'>
                <div className='col-md-4 toolbox__tool'><i className='fa fa-circle-o fa-2x'></i></div>
                <div className='col-md-4 toolbox__tool'><img src={Line} alt='' /></div>
            </div>
            <div className='row'>
                <div className='col-md-4 toolbox__tool'><img src={Polygon} alt='' /></div>
                <div className='col-md-4 toolbox__tool'><i className='fa fa-font fa-2x'></i></div>
            </div>
            <div className='row'>
                <div className='col-md-12 mb-3'>
                    <div className="alert alert-secondary  m-0 p-1">
                        Shape properties
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Toolbox;