import React from 'react';
import Shape from '../Shape/Shape';
import medalActive3 from '../../assets/images/medal3_1.png';
//import medalDisabled3 from '../../assets/images/medal3_2.png';
import medalActive2 from '../../assets/images/medal2_1.png';
//import medalDisabled2 from '../../assets/images/medal2_2.png';
import medalActive1 from '../../assets/images/medal1_1.png';
//import medalDisabled1 from '../../assets/images/medal1_2.png';

import './Drawing.css';

const Drawing = (props) => {
    return (<div className='col-md-3 mt-4 mb-4' >
        <div className="card border-secondary mb-3">
            <div className="card-header vac-card-header">{props.name}</div>
            <div className='card-body'>
                <svg className='drawing__svg' viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" onClick={props.onDrawingClick} >
                    {props.shapes && props.shapes.map((item, index) => {
                        return <Shape type={item.type} key={item.id} text={item.text} points={item.points} style={item.attributes} />
                    })}
                </svg>
            </div>
            {props.action === 'VIEW' &&
                <div className="card-footer text-muted">
                    <span><strong>Username</strong></span>
                    <span className='pull-right'>Points: <strong>20</strong></span>
                </div>}
            {props.action === 'VOTE' &&
                <div className="card-footer text-muted">
                    <div className='d-flex justify-content-around'>
                        <img className='drawing__medal' src={medalActive3} alt='3 points' />
                        <img className='drawing__medal' src={medalActive2} alt='3 points' />
                        <img className='drawing__medal' src={medalActive1} alt='3 points' />
                    </div>
                </div>}
        </div>
    </div>);
};

export default Drawing;