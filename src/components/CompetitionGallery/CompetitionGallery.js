import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DrawingModal from '../DrawingModal/DrawingModal';
import Drawing from '../Drawing/Drawing';
import Pagination from '../Pagination/Pagination';
import * as actions from '../../store/actions/actions'

class CompetitionGallery extends Component {
    state = {
        showModal: false,
        selectedDrawing: null,
        competitionId: null,
        competition: { name: null },
        nextPage: 1,
        currentPage: 1,
        limit: 1,
        isFetching: true
    };

    componentDidMount = () => {
        let competitionId = this.props.match.params.competitionId;
        this.setState({ competitionId });
        this.props.getDrawingsByCompetitionId(competitionId, 0, this.state.limit + 1);
        //this.props.getDrawings();
        axios({
            method: 'get',
            url: 'http://localhost:8080/competition/' + competitionId,
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        }).then(response => {
            let competition = response.data.data;
            if (competition) {
                this.setState({ competition });
            }
        }).catch(error => {
            console.log(error.response.data);
        });
    };

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.drawings.length) return;
        if (this.state.isFetching === true) {
            let nextPage = nextProps.drawings.length < (this.state.limit + 1) ? this.state.nextPage : (this.state.nextPage + 1);
            this.setState({ nextPage, isFetching: false });
        }
    };

    showDrawingHandler = (drawing) => {
        let selectedDrawing = { ...drawing };
        this.setState({ selectedDrawing, showModal: true });
    }

    closeDrawingModalHandler = () => {
        this.setState({ showModal: false });
    }

    nextPageHandler = (currentPage) => {
        let nextPage = currentPage + 1;
        let offset = (nextPage - 1) * this.state.limit;
        this.props.getDrawingsByCompetitionId(this.state.competitionId, offset, this.state.limit + 1);
        this.setState({ currentPage: nextPage, isFetching: true });
    };

    previousPageHandler = (currentPage) => {
        let nextPage = currentPage - 1;
        let offset = (nextPage - 1) * this.state.limit;
        this.props.getDrawingsByCompetitionId(this.state.competitionId, offset, this.state.limit + 1);
        this.setState({ currentPage: nextPage, nextPage: nextPage, isFetching: true });
    };


    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="portlet light">
                                <div className="portlet-title mb-4">
                                    <div className="caption">
                                        <span className="caption-subject mr-1" style={{ fontSize: '24px' }}> Gallery</span>
                                        {this.state.competition.name && <span className="caption-helper bold">Competition: {this.state.competition.name}</span>}
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className='row'>
                                        {this.props.drawings.map((drawing, index) => {
                                            if (this.state.currentPage !== this.state.nextPage && index === this.props.drawings.length - 1) return [];
                                            return <Drawing action='VIEW' key={drawing.id} name={drawing.name} shapes={drawing.shapes} onDrawingClick={() => this.showDrawingHandler(drawing)} />;
                                        })}
                                    </div>

                                    {!!this.props.drawings.length &&
                                        <Pagination
                                            currentPage={this.state.currentPage}
                                            nextPage={this.state.nextPage}
                                            nextPageHandler={this.nextPageHandler}
                                            previousPageHandler={this.previousPageHandler} />}

                                    {!this.state.competition.name &&
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <div className="alert alert-secondary" role="alert">
                                                    There is no competition with ID {this.state.competitionId}.
                                                </div>
                                            </div>
                                        </div>}

                                    {this.state.competition.name && !this.props.drawings.length &&
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
                </div>
                {this.state.showModal && <DrawingModal drawing={this.state.selectedDrawing} show={this.state.showModal} closeModal={this.closeDrawingModalHandler} />} 
            </React.Fragment>

        );
    };
};

const mapStateToProps = state => {
    return {
        drawings: state.drawings.drawings
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDrawingsByCompetitionId: (competitionId, offset, limit) => dispatch(actions.AsyncGetDrawingsByCompetitionId(competitionId, offset, limit)),
        getDrawings: () => dispatch(actions.AsyncGetAllDrawings())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionGallery);