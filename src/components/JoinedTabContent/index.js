import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const JoinedTabContent = function (props) {
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
                    return (
                        <tr key={competition.id}>
                            <td>{competition.name}</td>
                            <td>{competition.topic}</td>
                            <td>{competition.startDate.toLocaleDateString()
                                + ' ' + competition.startDate.toLocaleTimeString()}</td>
                            <td>{competition.endDate} minutes</td>
                            <td>{competition.votingStartDate} minutes</td>
                            <td>{competition.votingEndDate} minutes</td>
                            <td><Link
                                className='btn vac-btn-primary w-100'
                                to={'/gallery/competition/' + competition.id}>View</Link></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    ) : <div className="alert alert-secondary m-0" role="alert">Sorry, you need to join to one of competitions.</div>;
};

const mapStateToProps = function (state) {
    const availableCompetitions = state.competitions.competitions.filter(competition => {
        const isJoinedStatus = state.competitions.joined.indexOf(competition.id);
        return isJoinedStatus > -1;
    });

    return {
        competitions: availableCompetitions
    };
};

export default connect(mapStateToProps)(JoinedTabContent);