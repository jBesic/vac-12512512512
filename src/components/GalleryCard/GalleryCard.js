import React from 'react';
import Shape from '../../components/Shape/Shape';
import placeholder from '../../assets/images/placeholder4.png';
import { NavLink } from 'react-router-dom';

const GalleryCard = (props) => {
    return (<div className="card border-secondary mt-4 mb-3">
        <div className='card-body text-secondary gallery__card'>
            {props.action === 'VIEW' && props.shapes &&
                <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
                    {props.shapes.map((shape, index) => {
                        return <Shape type={shape.type} key={index} text={shape.text} points={shape.points} style={shape.attributes} />
                    })}
                </svg> }
            {props.action === 'VIEW' && !props.shapes && <img className="card-img-top mt-0" src={placeholder} alt="Card cap" />}
            {props.action === 'VOTE' && <div className='col-md-12 text-center bold' style={{margin: 'auto', color: 'red', marginTop: '15%'}}><h1 className='bold'>VOTING TIME</h1></div>}
        </div>
        <div className="card-footer text-muted">
            <div className='row'>
                <div className='col-md-6'><strong>{props.name}</strong></div>
                <div className='col-md-6'>
                    <NavLink to={props.link}>
                        <button className='btn vac-btn-primary btn-sm gallery__button'>View</button>
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
    )
};

export default GalleryCard;