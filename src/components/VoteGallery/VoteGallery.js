import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import Pagination from '../../components/Pagination/Pagination';
import GalleryCard from '../../components/GalleryCard/GalleryCard';

import '../../containers/Gallery/Gallery.css';

class Gallery extends Component {
    state = {
        activeTab: 'users',
        nextPage: 1,
        currentPage: 1,
        limit: 8,
        isFetching: true
    };

    componentDidMount = () => {
        this.props.getCompetitionsInVotePhase(0, this.state.limit + 1);
    };

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.competitions.length) return;
        if (this.state.isFetching === true) {
            let nextPage = nextProps.competitions.length < (this.state.limit + 1) ? this.state.nextPage : (this.state.nextPage + 1);
            this.setState({ nextPage, isFetching: false });
        }
    };

    nextPageHandler = (currentPage) => {
        let nextPage = currentPage + 1;
        let offset = (nextPage - 1) * this.state.limit;
        this.props.getCompetitionsInVotePhase(offset, this.state.limit + 1);
        this.setState({ currentPage: nextPage, nextPage: nextPage, isFetching: true });
    };

    previousPageHandler = (currentPage) => {
        let nextPage = currentPage - 1;
        let offset = (nextPage - 1) * this.state.limit;
        this.props.getCompetitionsInVotePhase(offset, this.state.limit + 1);
        this.setState({ currentPage: nextPage, nextPage: nextPage, isFetching: true });
    };

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className="card col-md-12">
                        <div className="card-header text-secondary vac-page-title">
                            Gallery  | <span className='small'> Vote</span>
                        </div>
                        <div className="card-body vac-page-body">
                            <div className='row'>
                                <div className='col-md-12'>
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <button className="nav-link active" role="tab">Competitions</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content p-4" style={{ backgroundColor: 'white' }}>
                                        <div className="tab-pane fade show active" role="tabpanel">
                                            <div className='row'>
                                                {this.props.competitions.map((item, index) => {
                                                    if (this.state.currentPage !== this.state.nextPage && index === this.props.competitions.length - 1) return [];
                                                    let shapes = item.drawings && item.drawings.length ? item.drawings[item.drawings.length - 1].shapes : null;
                                                    return <div key={item.id} className='col-md-3' >
                                                        <GalleryCard name={item.name} shapes={shapes} link={("/gallery/competition/" + item.id)} action={'VOTE'} />
                                                    </div>
                                                })}
                                            </div>
                                            <div className='row'>
                                                {!this.props.competitions.length &&
                                                    <div className='col-md-12'>
                                                        <div className="alert alert-secondary" role="alert">
                                                            No competitions.
                                            </div>
                                                    </div>}
                                            </div>
                                            {!!this.props.competitions.length &&
                                                <Pagination
                                                    currentPage={this.state.currentPage}
                                                    nextPage={this.state.nextPage}
                                                    nextPageHandler={this.nextPageHandler}
                                                    previousPageHandler={this.previousPageHandler} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        competitions: state.competitions.competitions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCompetitionsInVotePhase: (offset, limit) => dispatch(actions.AsyncGetCompetitionsInVotePhase(offset, limit)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);