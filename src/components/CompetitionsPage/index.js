import React from 'react';
import { connect } from 'react-redux';

import { createEditCompetitionModal } from '../../store/actions/actions';

const CompetitionsPage = function (props) {
    return (
        <div className="container">
            <h2 className='mb-5'>Competitions</h2>
            <div className='row'>
                <div className='col-md-12 d-flex justify-content-end'>
                    <button
                        onClick={() => {
                            props.createEditCompetitionModal();
                        }}
                        className='btn btn-primary vac-btn-primary'>Add New</button>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = function(dispatch) {
    return {
        createEditCompetitionModal: () => dispatch(createEditCompetitionModal('create', true))
    };
};

export default connect(null, mapDispatchToProps)(CompetitionsPage);