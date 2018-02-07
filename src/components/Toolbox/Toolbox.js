import React from 'react';
import Rectangle from '../../assets/images/rectangle.png';
import Triangle from '../../assets/images/triangle.png';
import Line from '../../assets/images/line.png';
import Polygon from '../../assets/images/polygon.png';
import {tools} from '../../helper/canvasHelper';

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
                <div className={'col-md-4 toolbox__tool' + (props.selectedTool === tools.SELECT ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.SELECT)}>
                    <i className='fa fa-mouse-pointer fa-2x'></i>
                </div>
                <div className={'col-md-4 toolbox__tool' + (props.selectedTool === tools.DELETE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.DELETE)}>
                    <i className='fa fa-eraser fa-2x'></i>
                </div>
            </div>
            <div className='row'>
                <div className={'col-md-4 toolbox__tool' + (props.selectedTool === tools.RECTANGLE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.RECTANGLE)}>
                    <img src={Rectangle} alt='' />
                </div>
                <div className={'col-md-4 toolbox__tool' + (props.selectedTool === tools.TRIANGLE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.TRIANGLE)}>
                    <img src={Triangle} alt='' />
                </div>
            </div>
            <div className='row'>
                <div className={'col-md-4 toolbox__tool' + (props.selectedTool === tools.CIRCLE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.CIRCLE)}>
                    <i className='fa fa-circle-o fa-2x'></i>
                </div>
                <div className={'col-md-4 toolbox__tool' + (props.selectedTool === tools.LINE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.LINE)}>
                    <img src={Line} alt='' />
                </div>
            </div>
            <div className='row'>
                <div className={'col-md-4 toolbox__tool' + (props.selectedTool === tools.POLYGON ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.POLYGON)}>
                    <img src={Polygon} alt='' />
                </div>
                <div className={'col-md-4 toolbox__tool' + (props.selectedTool === tools.TEXT_INPUT ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.TEXT_INPUT)}>
                    <i className='fa fa-font fa-2x'></i>
                </div>
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