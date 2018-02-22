import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawingModal from '../DrawingModal/DrawingModal';
import Drawing from '../Drawing/Drawing';
import Pagination from '../Pagination/Pagination';
import * as actions from '../../store/actions/actions';
import { withRouter } from 'react-router-dom';

class CompetitionGallery extends Component {
    state = {
        showModal: false,
        selectedDrawing: null,
        competitionId: null,
        nextPage: 1,
        currentPage: 1,
        limit: 8,
        competition: {},
        drawingIdWith3Points: null,
        drawingIdWith2Points: null,
        drawingIdWith1Point: null,
        votes: [],
        loggedUserId: null
    };

    componentDidMount = () => {
        let competitionId = this.props.match.params.competitionId;
        this.setState({ competitionId, votes: this.props.votes, competition: this.props.selectedCompetition });
        let data = { competitionId, offset: 0, limit: this.state.limit + 1 };
        this.props.getCompetitionGallery(data);
    };

    componentWillUnmount = () => {
        this.props.resetGalleryState();
    };

    updateStateFieldsForVoting = (votes) => {
        let drawingIdWith3Points = null;
        let drawingIdWith2Points = null;
        let drawingIdWith1Point = null;
        votes.forEach(vote => {
            if (vote.value === 3) {
                drawingIdWith3Points = vote.drawingId;
            } else if (vote.value === 2) {
                drawingIdWith2Points = vote.drawingId;
            } else {
                drawingIdWith1Point = vote.drawingId
            }
        });

        this.setState({ drawingIdWith3Points, drawingIdWith2Points, drawingIdWith1Point });
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.selectedCompetition.loggedUserId !== this.state.loggedUserId) {
            this.setState({ loggedUserId: nextProps.selectedCompetition.loggedUserId });
        }

        if (nextProps.selectedCompetition.action === 'VOTE' && nextProps.isLogged === false) {
            nextProps.history.push('/');
        }
        if (this.state.votes !== nextProps.votes) {
            this.updateStateFieldsForVoting(nextProps.votes);
            this.setState({ votes: nextProps.votes, votesChanged: false });
        }
        if (!this.props.selectedCompetition.drawings) return;
        if (this.state.competition !== nextProps.selectedCompetition) {
            let nextPage = nextProps.selectedCompetition.drawings.length < (this.state.limit + 1) ? this.state.nextPage : (this.state.nextPage + 1);
            this.setState({ nextPage, competition: nextProps.selectedCompetition });
        }
    };

    showDrawingModalHandler = (drawing) => {
        let selectedDrawing = { ...drawing };
        this.setState({ selectedDrawing, showModal: true });
    }

    closeDrawingModalHandler = () => {
        this.setState({ showModal: false });
    }

    nextPageHandler = (currentPage) => {
        let nextPage = currentPage + 1;
        let offset = (nextPage - 1) * this.state.limit;
        let data = { competitionId: this.state.competitionId, offset, limit: this.state.limit + 1 };
        this.props.getCompetitionGallery(data);
        this.setState({ currentPage: nextPage });
    };

    previousPageHandler = (currentPage) => {
        let nextPage = currentPage - 1;
        let offset = (nextPage - 1) * this.state.limit;
        let data = { competitionId: this.state.competitionId, offset, limit: this.state.limit + 1 };
        this.props.getCompetitionGallery(data);
        this.setState({ currentPage: nextPage, nextPage: nextPage });
    };

    addVoteHandler = (drawingId, value) => {
        let data = { drawingId, value, competitionId: this.state.competitionId };
        this.props.saveVote(data);
    }

    deleteVoteHandler = (drawingId) => {
        let data = { drawingId, competitionId: this.state.competitionId };
        this.props.deleteVote(data);

    };


    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <div className="card col-md-12">
                            <div className="card-header text-secondary vac-page-title">
                                Gallery
                                {this.props.selectedCompetition && <span> | <span className='small'>Competition: {this.props.selectedCompetition.name}</span></span>}
                            </div>
                            <div className="card-body vac-page-body">
                                {this.props.selectedCompetition.action === 'VOTE' && this.props.selectedCompetition.drawings && !!this.props.selectedCompetition.drawings.length &&
                                    <div className='row mt-2 mb-2'>
                                        <div className='col-md-1'><h5 className='text-secondary'>Votes:</h5></div>
                                        <div className='col-md-8'>
                                            {this.props.votes.map(vote => {
                                                return (
                                                    <span key={vote.id} className={"mr-3 badge" + (vote.value === 3 ? ' badge-success p-1' : (vote.value === 2 ? ' badge-primary p-1' : ' badge-danger p-1'))}>{vote.drawing.name} - Points: {vote.value}  <i onClick={() => this.deleteVoteHandler(vote.drawingId)} className="fa fa-remove ml-2" style={{ cursor: 'pointer' }}></i></span>
                                                );
                                            })}
                                            {!this.props.votes.length &&
                                                <div className='col-md-12'>
                                                    <span className="badge badge-secondary">None</span>
                                                </div>}
                                        </div>
                                    </div>}
                                <div className='row'>
                                    {this.props.selectedCompetition.drawings && this.props.selectedCompetition.drawings.map((drawing, index) => {
                                        if (this.state.currentPage !== this.state.nextPage && index === this.props.selectedCompetition.drawings.length - 1) return [];
                                        let numberOfPoints = drawing.votes.length ? drawing.votes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0) : 0;
                                        return <Drawing
                                            action={this.props.selectedCompetition.action}
                                            key={drawing.id} name={drawing.name}
                                            shapes={drawing.shapes}
                                            drawing={drawing}
                                            onDrawingClick={() => this.showDrawingModalHandler(drawing)}
                                            drawingIdWith3Points={this.state.drawingIdWith3Points}
                                            drawingIdWith2Points={this.state.drawingIdWith2Points}
                                            drawingIdWith1Point={this.state.drawingIdWith1Point}
                                            addVote={this.addVoteHandler}
                                            deleteVote={this.deleteVoteHandler}
                                            numberOfPoints={numberOfPoints}
                                            loggedUserId={this.state.loggedUserId} />;
                                    })}
                                </div>

                                {this.props.selectedCompetition.drawings && !!this.props.selectedCompetition.drawings.length &&
                                    <Pagination
                                        currentPage={this.state.currentPage}
                                        nextPage={this.state.nextPage}
                                        nextPageHandler={this.nextPageHandler}
                                        previousPageHandler={this.previousPageHandler} />}

                                {!this.props.selectedCompetition &&
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className="alert alert-secondary" role="alert">
                                                There is no competition with ID {this.state.competitionId}.
                                                </div>
                                        </div>
                                    </div>}

                                {this.props.selectedCompetition.drawings && !this.props.selectedCompetition.drawings.length &&
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className="alert alert-secondary" role="alert">
                                                No images.
                                                </div>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showModal && <DrawingModal drawing={this.state.selectedDrawing} show={this.state.showModal} closeModal={this.closeDrawingModalHandler} />}
            </React.Fragment>
        );
    };
};

const mapStateToProps = state => {
    return {
        selectedCompetition: state.gallery.selectedCompetition,
        votes: state.gallery.votes,
        isLogged: state.auth.isLoged
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCompetitionGallery: (data) => dispatch(actions.AsyncGetCompetitionGallery(data)),
        saveVote: (data) => dispatch(actions.AsyncSaveVote(data)),
        deleteVote: (data) => dispatch(actions.AsyncDeleteVote(data)),
        resetGalleryState: () => dispatch(actions.resetGalleryState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompetitionGallery));