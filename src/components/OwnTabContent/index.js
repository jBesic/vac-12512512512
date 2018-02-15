import React from 'react';
import { connect } from 'react-redux';

import { manageCompetitionModal } from '../../store/actions/actions';

const OwnTabContent = function (props) {
    return props.competitions.length > 0 ? (
        <table className="table table-hover m-0 vac-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Topic</th>
                    <th>Start Date &amp; time</th>
                    <th>Drawing duration</th>
                    <th>Drawing phase duration</th>
                    <th>Voting phase duration</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {props.competitions.map(competition => {
                    const now = new Date();
                    const startDate = new Date(competition.startDate);

                    return (
                        <tr key={competition.id}>
                            <td>{competition.name}</td>
                            <td>{competition.topic}</td>
                            <td>{competition.startDate.replace('T', ' ')}</td>
                            <td>{competition.endDate} minutes</td>
                            <td>{competition.votingStartDate} minutes</td>
                            <td>{competition.votingEndDate} minutes</td>
                            <td>{now < startDate ? <button
                                type='button'
                                className='btn vac-btn-primary w-100'
                                onClick={() => props.manageCompetitionModal('edit', true, competition.id)}>Edit</button> : <button
                                    type='button'
                                    className='btn vac-btn-primary w-100'
                                    onClick={() => console.log('View')}>View</button>}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    ) : <p className='m-0'>Sorry, we can not find a competition to draw.</p>;
};

const mapStateToProps = function (state) {
    return {
        competitions: state.competitions.competitions
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        manageCompetitionModal: (component, show, competitionId) => dispatch(manageCompetitionModal(component, show, competitionId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnTabContent);