import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AsyncCreateEditCompetition } from '../../store/actions/actions';

class CreateEditCompetition extends Component {
    constructor(props) {
        super();

        this.setPropertyByName = this.setPropertyByName.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            competitionName: '',
            competitionTopic: '',
            startDateTime: '',
            drawingDuration: 5
        };

        this.state.drawingPhase = 2 * Number.parseInt(this.state.drawingDuration, 10);
        this.state.votingPhase = 2 * Number.parseInt(this.state.drawingDuration, 10);
    }

    setPropertyByName(propertyKey, value) {
        let drawingVotingPhase = {};
        if (propertyKey === 'drawingDuration') {
            drawingVotingPhase.drawingPhase = 2 * Number.parseInt(value, 10);
            drawingVotingPhase.votingPhase = 2 * Number.parseInt(value, 10);
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
        const isInvalid = this.state.competitionName === '' || this.state.competitionTopic === '' || this.state.startDateTime === '' || this.state.drawingDuration === '' || this.state.drawingPhase === '' || this.state.votingPhase === '';

        return (
            <form className='d-block w-100' onSubmit={this.submitHandler}>
                {this.props.competitions.message ? <div className="alert alert-danger">{this.props.competitions.message}</div> : null}
                <h4 className="mb-4">{this.props.competitions.createCompetition ? 'Create' : 'Edit'} competition</h4>
                <div className="form-group">
                    <label htmlFor="competitionName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="competitionName"
                        onChange={ev => this.setPropertyByName('competitionName', ev.target.value)}
                        value={this.state.competitionName} />
                </div>
                <div className="form-group">
                    <label htmlFor="competitionTopic">Topic</label>
                    <input
                        type="text"
                        className="form-control"
                        id="competitionTopic"
                        onChange={ev => this.setPropertyByName('competitionTopic', ev.target.value)}
                        value={this.state.competitionTopic} />
                </div>
                <div className="form-group">
                    <label htmlFor="startDateTime">Start date &amp; time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="startDateTime"
                        onChange={ev => this.setPropertyByName('startDateTime', ev.target.value)}
                        value={this.state.startDateTime} />
                </div>
                <div className="form-group">
                    <label htmlFor="drawingDuration">Drawing duration</label>
                    <input
                        type="number"
                        min='5' max='30'
                        className="form-control"
                        id="drawingDuration"
                        onChange={ev => this.setPropertyByName('drawingDuration', ev.target.value)}
                        value={this.state.drawingDuration} />
                </div>
                <div className="form-group">
                    <label htmlFor="drawingPhase">Drawing phase duration</label>
                    <input
                        type="number"
                        min={2 * Number.parseInt(this.state.drawingDuration, 10)}
                        className="form-control"
                        id="drawingPhase"
                        onChange={ev => this.setPropertyByName('drawingPhase', ev.target.value)}
                        value={this.state.drawingPhase} />
                </div>
                <div className="form-group">
                    <label htmlFor="votingPhase">Voting phase duration</label>
                    <input
                        type="number"
                        min={2 * Number.parseInt(this.state.drawingDuration, 10)}
                        className="form-control"
                        id="votingPhase"
                        onChange={ev => this.setPropertyByName('votingPhase', ev.target.value)}
                        value={this.state.votingPhase} />
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