import React from 'react';

const Pagination = (props) => {
    return (
        <div className='row'>
            <div className='col-md-12 mt-5'>
                <div className='pull-right'>
                    <button disabled={props.currentPage === 1} className='btn vac-btn-primary btn-sm' onClick={() => props.previousPageHandler(props.currentPage)}><i className="fa fa-angle-left fa-lg"></i></button>
                    <span className='ml-2 mr-2'><strong>{props.currentPage}</strong></span>
                    <button disabled={props.currentPage === props.nextPage} onClick={() => props.nextPageHandler(props.currentPage)} className='btn vac-btn-primary btn-sm'><i className="fa fa-angle-right fa-lg"></i></button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;