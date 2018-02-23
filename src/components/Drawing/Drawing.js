import React from 'react';
import Shape from '../Shape/Shape';
import medalActive3 from '../../assets/images/medal3_1.png';
import medalDisabled3 from '../../assets/images/medal3_2.png';
import medalActive2 from '../../assets/images/medal2_1.png';
import medalDisabled2 from '../../assets/images/medal2_2.png';
import medalActive1 from '../../assets/images/medal1_1.png';
import medalDisabled1 from '../../assets/images/medal1_2.png';

import './Drawing.css';

const Drawing = (props) => {
    let disableAllMedalsForDrawing = props.loggedUserId && props.loggedUserId === props.drawing.userId ? true : false;
    let isUserDrawing = props.loggedUserId && props.loggedUserId === props.drawing.userId ? true : false;
    return (<div className='col-md-3 mt-4 mb-4' >
        <div className="card border-secondary mb-3">
            <div className="card-header vac-card-header">{props.name}</div>
            <div className='card-body'>
                <svg className='drawing__svg' viewBox="0 0 730 550" preserveAspectRatio="xMidYMid meet" onClick={props.onDrawingClick} >
                    {props.shapes && props.shapes.map((item, index) => {
                        return <Shape type={item.type} key={item.id} text={item.text} points={item.points} style={item.attributes} />
                    })}
                </svg>
            </div>
            {props.action === 'VIEW' &&
                <div className="card-footer text-muted">
                    <span><strong>{props.drawing.user.username}</strong></span>
                    <span className='pull-right'>Points: <strong>{props.drawing.numberOfPoints}</strong></span>
                </div>}
            {props.action === 'VOTE' && !isUserDrawing &&
                <div className="card-footer text-muted" style={{minHeight: '58px'}}>
                    <div className='d-flex justify-content-around'>
                    { /* Medal 3 - Images */}
                        {props.drawingIdWith3Points === props.drawing.id &&
                            <img onClick={() => props.deleteVote(props.drawing.id)} className='drawing__medal' src={medalActive3} alt='Undo vote' />}

                        {!(props.drawingIdWith3Points === props.drawing.id) &&
                            <img
                                onClick={disableAllMedalsForDrawing || props.drawingIdWith3Points != null || props.drawingIdWith2Points === props.drawing.id || props.drawingIdWith1Point === props.drawing.id ? () => {} : () => props.addVote(props.drawing.id, 3)}
                                className={'drawing__medal' + (disableAllMedalsForDrawing || props.drawingIdWith3Points != null || props.drawingIdWith2Points === props.drawing.id || props.drawingIdWith1Point === props.drawing.id ? ' drawing__medal_disabled' : '')}
                                src={medalDisabled3} alt='Add vote' />}

                        { /* Medal 2 - Images */}
                        {props.drawingIdWith2Points === props.drawing.id &&
                            <img onClick={() => props.deleteVote(props.drawing.id)} className='drawing__medal' src={medalActive2} alt='Undo Vote' />}

                        {!(props.drawingIdWith2Points === props.drawing.id) &&
                            <img
                            onClick={disableAllMedalsForDrawing || props.drawingIdWith2Points != null || props.drawingIdWith3Points === props.drawing.id || props.drawingIdWith1Point === props.drawing.id ? () => {} : () => props.addVote(props.drawing.id, 2)}
                            className={'drawing__medal' + (disableAllMedalsForDrawing || props.drawingIdWith2Points != null || props.drawingIdWith3Points === props.drawing.id || props.drawingIdWith1Point === props.drawing.id ? ' drawing__medal_disabled' : '')}
                            src={medalDisabled2} alt='Add vote' />}

                        { /* Medal 1 - Images */}
                        {props.drawingIdWith1Point === props.drawing.id &&
                            <img onClick={() => props.deleteVote(props.drawing.id)} className='drawing__medal' src={medalActive1} alt='Undo vote' />}

                        {!(props.drawingIdWith1Point === props.drawing.id) &&
                            <img
                            onClick={disableAllMedalsForDrawing || props.drawingIdWith1Point != null || props.drawingIdWith3Points === props.drawing.id || props.drawingIdWith2Points === props.drawing.id ? () => {} : () => props.addVote(props.drawing.id, 1)}
                            className={'drawing__medal' + (disableAllMedalsForDrawing || props.drawingIdWith1Point != null || props.drawingIdWith3Points === props.drawing.id || props.drawingIdWith2Points === props.drawing.id ? ' drawing__medal_disabled' : '')}
                            src={medalDisabled1} alt='Add vote' />}
                    </div>
                </div>}

                {props.action === 'VOTE' && isUserDrawing &&
                <div className="card-footer text-muted text-center" style={{minHeight: '58px'}}>
                    <span><strong>Your Drawing</strong></span>
                </div>}
        </div>
    </div>);
};

export default Drawing;