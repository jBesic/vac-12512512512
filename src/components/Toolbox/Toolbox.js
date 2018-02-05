import React from 'react';

const Toolbox = (props) => {
    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-md-12'>Select</div>
            </div>
            <div className='row'>
                <div className='col-md-6'><i className='fa fa-square-o'></i></div>
                <div className='col-md-6'>Triangle</div>
            </div>
            <div className='row'>
                <div className='col-md-6'>Polygon</div>
                <div className='col-md-6'>Circle</div>
            </div>
        </React.Fragment>
    );
}

export default Toolbox;