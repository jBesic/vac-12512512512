import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startCompetition } from '../../store/actions/actions';

class StartCompetition extends Component {
    constructor(props) {
        super();

        this.competitionDetails = this.competitionDetails.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            competitionId: '',
            competitionDetails: {}
        };
    }

    competitionDetails(competitionId) {
        if (competitionId === '') return true;

        const selectedCompetition = this.props.competitions.find(competition => {
            return competition.id === Number.parseInt(competitionId, 10);
        });

        this.setState({
            competitionId: competitionId,
            competitionDetails: selectedCompetition
        })
    }

    submitHandler(ev) {
        ev.preventDefault();
        this.props.startCompetitionDispatch(this.state.competitionDetails);
    }

    render() {
        const isInvalid = this.state.competitionId === '';
        return (
            <form className='d-block w-100' onSubmit={this.submitHandler}>
                {this.props.competitions.message ? <div className="alert alert-danger">{this.props.competitions.message}</div> : null}
                <h4 className="mb-4">Join to the competition</h4>
                <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pro</p>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <select
                        className="form-control"
                        id="name"
                        value={this.state.competitionId}
                        onChange={(ev) => this.competitionDetails(ev.target.value)}>
                        {this.state.competitionId ? null : <option value='' disabled>Select competition ...</option>}
                        {this.props.competitions.map(competition => {
                            return (
                                <option
                                    key={competition.id}
                                    value={competition.id}>{competition.name}</option>
                            )
                        })}
                    </select>
                </div>

                {this.state.competitionId ? (
                    <div>
                        <div className="form-group mt-4">
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
                                value={this.state.competitionDetails.startDate} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">Drawing duration</label>
                            <input
                                type="number"
                                min='5' max='30'
                                className="form-control"
                                id="endDate"
                                readOnly={true}
                                value={this.state.competitionDetails.endDate} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="votingStartDate">Drawing phase duration</label>
                            <input
                                type="number"
                                min={2 * Number.parseInt(this.state.competitionDetails.endDate, 10)}
                                className="form-control"
                                id="votingStartDate"
                                readOnly={true}
                                value={this.state.competitionDetails.votingStartDate} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="votingEndDate">Voting phase duration</label>
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
        );
    }
}

function mapStateToProps(state) {
    return {
        competitions: state.competitions.competitions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        startCompetitionDispatch: competitionDetails => dispatch(startCompetition(competitionDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartCompetition);