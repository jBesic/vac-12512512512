import React from 'react';

import select from '../../assets/images/select.svg';
import eraser from '../../assets/images/eraser.svg';
import rectangle from '../../assets/images/rectangle.svg';
import circle from '../../assets/images/circle.svg';
import triangle from '../../assets/images/triangle.svg';
import polygon from '../../assets/images/polygon.svg';
import line from '../../assets/images/line.svg';
import text from '../../assets/images/text.svg';

import { tools } from '../../helper/canvasHelper';
import ShapeProperties from '../ShapeProperties';

import './Toolbox.css';

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
            <div className='row toolbar-tools'>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.SELECT ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.SELECT)}>
                        <img className="img-fluid" src={select} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.DELETE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.DELETE)}>
                        <img className="img-fluid" src={eraser} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.RECTANGLE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.RECTANGLE)}>
                        <img className="img-fluid" src={rectangle} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.TRIANGLE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.TRIANGLE)}>
                        <img className="img-fluid" src={triangle} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.CIRCLE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.CIRCLE)}>
                        <img className="img-fluid" src={circle} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.LINE ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.LINE)}>
                        <img className="img-fluid" src={line} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.POLYGON ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.POLYGON)}>
                        <img className="img-fluid" src={polygon} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={'toolbox__tool' + (props.selectedTool === tools.TEXT_INPUT ? ' toolbox__tool-selected' : '') + (props.drawStarted ? ' toolbox__tool-disabled' : '')} onClick={() => props.selectToolHandler(tools.TEXT_INPUT)}>
                        <img className="img-fluid" src={text} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Toolbox;