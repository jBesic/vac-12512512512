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
            competitionDuration: '',
            drawingTime: '',
            votingTime: ''
        };
    }

    setPropertyByName(propertyKey, value) {
        this.setState({
            [propertyKey]: value
        });
    }

    submitHandler(ev) {
        ev.preventDefault();
        this.props.createEditCompetitionDispatch(this.state);
    }

    render() {
        const isInvalid = this.state.competitionName === '' || this.state.competitionTopic === '' || this.state.startDateTime === '' || this.state.competitionDuration === '' || this.state.drawingTime === '' || this.state.votingTime === '';

        return (
            <form className='d-block w-100' onSubmit={this.submitHandler}>
                {this.props.competitions.message ? <div className="alert alert-danger">{this.props.competitions.message}</div> : null}
                <h4 className="mb-4">{this.props.competitions.createCompetition ? 'Create' : 'Edit'} competition</h4>
                <div className="form-group">
                    <label htmlFor="competitionName">Competition name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="competitionName"
                        onChange={ev => this.setPropertyByName('competitionName', ev.target.value)}
                        value={this.state.competitionName}
                        placeholder="Enter a competition name" />
                </div>
                <div className="form-group">
                    <label htmlFor="competitionTopic">Competition topic</label>
                    <input
                        type="text"
                        className="form-control"
                        id="competitionTopic"
                        onChange={ev => this.setPropertyByName('competitionTopic', ev.target.value)}
                        value={this.state.competitionTopic}
                        placeholder="Enter a competition topic" />
                </div>
                <div className="form-group">
                    <label htmlFor="startDateTime">Competition start date and time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="startDateTime"
                        onChange={ev => this.setPropertyByName('startDateTime', ev.target.value)}
                        value={this.state.startDateTime}
                        placeholder="Enter a competition start date and time" />
                </div>
                <div className="form-group">
                    <label htmlFor="competitionDuration">Drawing duration</label>
                    <input
                        type="number"
                        min='5' max='30'
                        className="form-control"
                        id="competitionDuration"
                        onChange={ev => this.setPropertyByName('competitionDuration', ev.target.value)}
                        value={this.state.competitionDuration}
                        placeholder="Drawing duration" />
                </div>
                <div className="form-group">
                    <label htmlFor="drawingTime">Drawing phase duration</label>
                    <input
                        type="number"
                        min='5' max='30'
                        className="form-control"
                        id="drawingTime"
                        onChange={ev => this.setPropertyByName('drawingTime', ev.target.value)}
                        value={this.state.drawingTime}
                        placeholder="Drawing phase duration" />
                </div>
                <div className="form-group">
                    <label htmlFor="votingTime">Voting phase duration</label>
                    <input
                        type="number"
                        min='5' max='30'
                        className="form-control"
                        id="votingTime"
                        onChange={ev => this.setPropertyByName('votingTime', ev.target.value)}
                        value={this.state.votingTime}
                        placeholder="Voting phase duration" />
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