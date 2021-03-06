import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Pagination from '../Pagination/Pagination';
import { AsyncLoadCompetitions } from '../../store/actions/actions';

class JoinedTabContent extends Component {
    constructor(props) {
        super();

        this.state = {
            nextPage: 1,
            currentPage: 1,
            limit: 10,
            offset: 0
        };
    }

    loadCompetitions(status) {
        this.props.loadCompetitions({
            status: status,
            limit: this.state.limit + 1,
            offset: this.state.offset
        });
    }

    updateNextPage(competitions) {
        let nextPage = competitions.slice(this.state.offset, this.state.offset + this.state.limit).length < this.state.limit ? this.state.nextPage : (this.state.nextPage + 1);
        this.setState({ nextPage: nextPage });
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.competitions.length === 0) {
            return true;
        }

        let nextPage = nextProps.competitions.slice(this.state.offset, this.state.offset + this.state.limit).length < this.state.limit ? this.state.nextPage : (this.state.nextPage + 1);
        this.setState({ nextPage: nextPage });
    };

    componentDidMount() {
        this.loadCompetitions('joined');
    }

    nextPageHandler = (currentPage) => {
        let nextPage = currentPage + 1;
        let offset = currentPage * this.state.limit;
        this.setState({ currentPage: nextPage, nextPage: nextPage, offset: offset });

        setTimeout(() => {
            this.loadCompetitions('joined');
        }, 10);
    };

    previousPageHandler = (currentPage) => {
        let nextPage = currentPage - 1;
        let offset = (nextPage - 1) * this.state.limit;
        this.setState({ currentPage: nextPage, nextPage: nextPage, offset: offset });

        setTimeout(() => {
            this.loadCompetitions('joined');
        }, 10);
    };

    render() {
        return this.props.competitions.length > 0 ? (
            <div>
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
                        {this.props.competitions.slice(this.state.offset, this.state.offset + this.state.limit).map(competition => {
                            return (
                                <tr key={competition.id}>
                                    <td>{competition.name}</td>
                                    <td>{competition.topic}</td>
                                    <td>{competition.startDate.toLocaleDateString()
                                        + ' ' + competition.startDate.toLocaleTimeString()}</td>
                                    <td>{competition.endDate} minutes</td>
                                    <td>{('0' + Math.floor(competition.votingStartDate / 60)).slice(-2) + ':' + ('0' + competition.votingStartDate % 60).slice(-2)} hours</td>
                                    <td>{('0' + Math.floor(competition.votingEndDate / 60)).slice(-2) + ':' + ('0' + competition.votingEndDate % 60).slice(-2)} hours</td>
                                    <td><Link
                                        className='btn vac-btn-primary w-100'
                                        to={'/gallery/competition/' + competition.id}>View</Link></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination
                    currentPage={this.state.currentPage}
                    nextPage={this.state.nextPage}
                    nextPageHandler={this.nextPageHandler}
                    previousPageHandler={this.previousPageHandler} />
            </div>
        ) : <div className="alert alert-secondary m-0" role="alert">Sorry, you need to join to one of competitions.</div>;
    }
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

const mapDispatchToProps = function (dispatch) {
    return {
        loadCompetitions: query => dispatch(AsyncLoadCompetitions(query))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinedTabContent);