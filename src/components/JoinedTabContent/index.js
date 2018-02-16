import React from 'react';
import { connect } from 'react-redux';

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
                            <td>{competition.startDate.replace('T', ' ')}</td>
                            <td>{competition.endDate} minutes</td>
                            <td>{competition.votingStartDate} minutes</td>
                            <td>{competition.votingEndDate} minutes</td>
                            <td><button
                                type='button'
                                className='btn vac-btn-primary w-100'
                                onClick={() => console.log('View')}>View</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    ) : <p className='m-0'>Sorry, you need to join to one of competitions.</p>;
};

const mapStateToProps = function (state) {
    return {
        competitions: [...state.competitions.competitions]
    };
};

export default connect(mapStateToProps)(JoinedTabContent);