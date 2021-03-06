import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import notFound from '../../assets/images/not-found.png';
import { startCompetition, manageCompetitionModal, AsyncLoadCompetitions } from '../../store/actions/actions';

class StartCompetition extends Component {
    constructor(props) {
        super();

        this.competitionDetails = this.competitionDetails.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            competitionId: '',
            competitionDetails: {},
            message: ''
        };
    }

    componentWillMount() {
        const newState = {};
        if (this.props.manageCompetitionId !== '') {
            newState.competitionId = this.props.manageCompetitionId;
            newState.competitionDetails = this.choosedCompetition(this.props.manageCompetitionId);
        }

        this.setState(newState);
    }

    componentDidMount() {
        if (this.props.competitions.length === 0) {
            this.props.loadCompetitions({
                status: 'draw'
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.started.hasOwnProperty('id')) {
            nextProps.history.push('/canvas');
            this.props.manageCompetitionModal();
        }

        const newState = {};
        if (nextProps.message !== '') {
            newState.competitionId = '';
            newState.competitionDetails = {};
            newState.message = nextProps.message;
        }

        this.setState(newState);
    }

    choosedCompetition(competitionId) {
        if (competitionId === '') return {};

        return this.props.competitions.find(competition => {
            return competition.id === Number.parseInt(competitionId, 10);
        });
    }

    dateTimeLocal(dateTimeLocal) {
        if (dateTimeLocal instanceof Date) {
            let dateTime = dateTimeLocal.getFullYear() + '-';
            dateTime += ('0' + (1 + dateTimeLocal.getMonth())).slice(-2) + '-';
            dateTime += ('0' + dateTimeLocal.getDate()).slice(-2) + 'T';
            dateTime += ('0' + dateTimeLocal.getHours()).slice(-2) + ':';
            dateTime += ('0' + dateTimeLocal.getMinutes()).slice(-2);

            return dateTime;
        }

        return dateTimeLocal;
    }

    competitionDetails(competitionId) {
        const selectedCompetition = this.choosedCompetition(competitionId);
        if (Object.keys(selectedCompetition).length === 0) {
            return true;
        }

        this.setState({
            competitionId: competitionId,
            competitionDetails: selectedCompetition,
            message: ''
        })
    }

    submitHandler(ev) {
        ev.preventDefault();
        this.props.startCompetitionDispatch(this.state.competitionDetails);
    }

    render() {
        const isInvalid = this.state.competitionId === '';
        return this.props.competitions.length > 0 ? (
            <div>
                <h4 className="mb-4">Join to a competition</h4>
                <p>Welcome. When you start drawing, you should make an art related to a <strong>competition topic</strong>. Also,pay attention to the <strong>Drawing duration</strong> which is the time you have to finish your awesome art.</p>
                <form className='mt-2 d-block w-100' onSubmit={this.submitHandler}>
                    {this.state.message ? <div className="alert alert-danger">{this.state.message}</div> : null}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Select
                            className="form-control"
                            id="name"
                            disabled={this.props.manageCompetitionId !== '' ? true : false}
                            value={this.state.competitionId}
                            onChange={option => {
                                const value = option === null ? '' : option.value;
                                this.competitionDetails(value);
                            }}
                            options={this.props.competitions.map(competition => {
                                return {
                                    value: competition.id,
                                    label: competition.name
                                }
                            })}
                        />

                    </div>

                    {this.state.competitionId ? (
                        <div>
                            <div className="form-group">
                                <label htmlFor="topic">Topic</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="topic"
                                    readOnly={true}
                                    value={this.state.competitionDetails.topic} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Start date &amp; time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="startDate"
                                    readOnly={true}
                                    value={this.dateTimeLocal(this.state.competitionDetails.startDate)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">Drawing duration <small>(minutes)</small></label>
                                <input
                                    type="number"
                                    min='5' max='30'
                                    className="form-control"
                                    id="endDate"
                                    readOnly={true}
                                    value={this.state.competitionDetails.endDate} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="votingStartDate">Drawing phase duration <small>(minutes)</small></label>
                                <input
                                    type="number"
                                    min={2 * Number.parseInt(this.state.competitionDetails.endDate, 10)}
                                    className="form-control"
                                    id="votingStartDate"
                                    readOnly={true}
                                    value={this.state.competitionDetails.votingStartDate} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="votingEndDate">Voting phase duration <small>(minutes)</small></label>
                                <input
                                    type="number"
                                    min={2 * Number.parseInt(this.state.competitionDetails.endDate, 10)}
                                    className="form-control"
                                    id="votingEndDate"
                                    readOnly={true}
                                    value={this.state.competitionDetails.votingEndDate} />
                            </div>
                        </div>
                    ) : null}

                    <button
                        disabled={isInvalid}
                        type="submit"
                        className="btn btn-block btn-primary vac-btn-primary">Join</button>
                </form>
            </div>
        ) : (
                <div>
                    <h4 className="mb-4">Join to a competition</h4>
                    <img alt="Not found" className='img-fluid d-block w-75 mx-auto mb-4' src={notFound} />
                    <div className="alert alert-secondary text-center m-0" role="alert">Sorry, we have not found any active competition. Please try again in few minutes.</div>
                </div>
            );
    }
}

function mapStateToProps(state) {
    const availableCompetitions = state.competitions.competitions.filter(competition => {
        const isDrawStatus = state.competitions.draw.indexOf(competition.id);
        return isDrawStatus > -1;
    });

    return {
        competitions: availableCompetitions,
        message: state.competitions.message,
        started: state.competitions.started,
        manageCompetitionId: state.competitions.manageCompetitionId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        startCompetitionDispatch: competitionDetails => dispatch(startCompetition(competitionDetails)),
        manageCompetitionModal: () => dispatch(manageCompetitionModal()),
        loadCompetitions: query => dispatch(AsyncLoadCompetitions(query))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StartCompetition));