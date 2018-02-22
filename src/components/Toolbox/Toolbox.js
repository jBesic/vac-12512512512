import React from 'react';

//import select from '../../assets/images/select.svg';
import eraser from '../../assets/images/eraser.svg';
import rectangle from '../../assets/images/rectangle.png';
import ellipse from '../../assets/images/ellipse.png';
import triangle from '../../assets/images/triangle.png';
import polygon from '../../assets/images/polygon.png';
import line from '../../assets/images/line.png';
import text from '../../assets/images/text.svg';
import bucket from '../../assets/images/bucket.png';

import { tools } from '../../helper/canvasHelper';

import './Toolbox.css';

const Toolbox = (props) => {
    return <div className="card">
        <div className="card-header vac-card-header">
            Toolbox
        </div>
        <div className='card-body'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.SELECT ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.SELECT)}>
                        <i className='fa fa-mouse-pointer fa-lg'></i>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.DELETE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.DELETE)}>
                        <img alt='Toolbar icon' className="img-fluid" src={eraser} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.RECTANGLE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.RECTANGLE)}>
                        <img alt='Toolbar icon' className="img-fluid" src={rectangle} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.TRIANGLE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.TRIANGLE)}>
                        <img alt='Toolbar icon' className="img-fluid" src={triangle} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.ELLIPSE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.ELLIPSE)}>
                        <img alt='Toolbar icon' className="img-fluid" src={ellipse} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.LINE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.LINE)}>
                        <img alt='Toolbar icon' className="img-fluid" src={line} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.POLYGON ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.POLYGON)}>
                        <img alt='Toolbar icon' className="img-fluid" src={polygon} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.CIRCLE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.CIRCLE)}>
                        <i className='fa fa-circle-o fa-2x'></i>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.TEXT_INPUT ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.TEXT_INPUT)}>
                        <img alt='Toolbar icon' className="img-fluid" src={text} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.BUCKET ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.BUCKET)}>
                        <img alt='Toolbar icon' className="img-fluid" src={bucket} />
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Toolbox;