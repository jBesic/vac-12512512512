import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AsyncCreateEditCompetition } from '../../store/actions/actions';

class CreateEditCompetition extends Component {
    constructor(props) {
        super();

        this.setPropertyByName = this.setPropertyByName.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            name: '',
            topic: '',
            startDate: '',
            endDate: 5
        };

        this.state.votingStartDate = 2 * Number.parseInt(this.state.endDate, 10);
        this.state.votingEndDate = 2 * Number.parseInt(this.state.endDate, 10);
    }

    setPropertyByName(propertyKey, value) {
        let drawingVotingPhase = {};
        if (propertyKey === 'endDate') {
            drawingVotingPhase.votingStartDate = 2 * Number.parseInt(value, 10);
            drawingVotingPhase.votingEndDate = 2 * Number.parseInt(value, 10);
        }

        this.setState({
            [propertyKey]: value,
            ...drawingVotingPhase
        });
    }

    submitHandler(ev) {
        ev.preventDefault();
        this.props.createEditCompetitionDispatch(this.state);
    }

    render() {
        const isInvalid = this.state.name === '' || this.state.topic === '' || this.state.startDate === '' || this.state.endDate === '' || this.state.votingStartDate === '' || this.state.votingEndDate === '';

        return (
            <form className='d-block w-100' onSubmit={this.submitHandler}>
                {this.props.competitions.message ? <div className="alert alert-danger">{this.props.competitions.message}</div> : null}
                <h4 className="mb-4">{this.props.competitions.createCompetition ? 'Create' : 'Edit'} competition</h4>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        onChange={ev => this.setPropertyByName('name', ev.target.value)}
                        value={this.state.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="topic">Topic</label>
                    <input
                        type="text"
                        className="form-control"
                        id="topic"
                        onChange={ev => this.setPropertyByName('topic', ev.target.value)}
                        value={this.state.topic} />
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Start date &amp; time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="startDate"
                        onChange={ev => this.setPropertyByName('startDate', ev.target.value)}
                        value={this.state.startDate} />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">Drawing duration</label>
                    <input
                        type="number"
                        min='5' max='30'
                        className="form-control"
                        id="endDate"
                        onChange={ev => this.setPropertyByName('endDate', ev.target.value)}
                        value={this.state.endDate} />
                </div>
                <div className="form-group">
                    <label htmlFor="votingStartDate">Drawing phase duration</label>
                    <input
                        type="number"
                        min={2 * Number.parseInt(this.state.endDate, 10)}
                        className="form-control"
                        id="votingStartDate"
                        onChange={ev => this.setPropertyByName('votingStartDate', ev.target.value)}
                        value={this.state.votingStartDate} />
                </div>
                <div className="form-group">
                    <label htmlFor="votingEndDate">Voting phase duration</label>
                    <input
                        type="number"
                        min={2 * Number.parseInt(this.state.endDate, 10)}
                        className="form-control"
                        id="votingEndDate"
                        onChange={ev => this.setPropertyByName('votingEndDate', ev.target.value)}
                        value={this.state.votingEndDate} />
                </div>
                <button
                    disabled={isInvalid}
                    type="submit"
                    className="btn btn-block btn-primary vac-btn-primary">{this.props.competitions.createCompetition ? 'Create' : 'Update'}</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        competitions: state.competitions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createEditCompetitionDispatch: competitionData => dispatch(AsyncCreateEditCompetition(competitionData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditCompetition);