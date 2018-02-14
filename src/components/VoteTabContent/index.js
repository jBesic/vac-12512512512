import React from 'react';
import { connect } from 'react-redux';

const VoteTabContent = function (props) {
    return props.competitions.length > 0 ? (
        <table className="table table-hover m-0">
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
                <tr>
                    <td>xxxxxx</td>
                    <td>xxxxxx</td>
                    <td>xxxxxx</td>
                    <td>xxxxxx</td>
                    <td>xxxxxx</td>
                    <td>xxxxxx</td>
                    <td><button
                        type='button'
                        className='btn vac-btn-primary w-100'
                        onClick={() => console.log('action')}>Join</button></td>
                </tr>
            </tbody>
        </table>
    ) : <p className='m-0'>Sorry, we can not find a competition to draw.</p>;
};

const mapStateToProps = function (state) {
    return {
        competitions: [...state.competitions.competitions]
    };
};

export default connect(mapStateToProps)(VoteTabContent);