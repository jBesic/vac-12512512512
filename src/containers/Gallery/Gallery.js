import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import Pagination from '../../components/Pagination/Pagination';
import GalleryCard from '../../components/GalleryCard/GalleryCard';

import './Gallery.css';

class Gallery extends Component {
    state = {
        activeTab: 'users',
        nextUsersPage: 1,
        currentUsersPage: 1,
        nextCompetitionsPage: 1,
        currentCompetitionsPage: 1,
        limit: 1,
        isFetching: true,
        isFirstCompetitionsLoading: true
    };

    componentDidMount = () => {
        this.props.getUsers(0, this.state.limit + 1);
    };

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.users.length && !nextProps.competitions.length) return;
        if (this.state.isFetching === true) {
            if (this.state.activeTab === 'users') {
                let nextUsersPage = nextProps.users.length < (this.state.limit + 1) ? this.state.nextUsersPage : (this.state.nextUsersPage + 1);
                this.setState({ nextUsersPage, isFetching: false });
            }
            else {
                let nextCompetitionsPage = nextProps.competitions.length < (this.state.limit + 1) ? this.state.nextCompetitionsPage : (this.state.nextCompetitionsPage + 1);
                this.setState({ nextCompetitionsPage, isFetching: false });
            }
        }
    };

    activeTabHandler = (tab) => {
        this.setState({ activeTab: tab });
        if (tab === 'users') {
            let time = (new Date() - this.props.usersModifiedDate) / 1000;
            if (time > 30) {
                let offset = (this.state.currentUsersPage - 1) * this.state.limit;
                this.props.getUsers(offset, this.state.limit + 1);
                this.setState({ isFetching: true });
            }
        } else {
            let offset = (this.state.currentCompetitionsPage - 1) * this.state.limit;
            if (this.state.isFirstCompetitionsLoading === true) {
                this.props.getCompetitions(offset, this.state.limit + 1);
                this.setState({ isFetching: true, isFirstCompetitionsLoading: false });
            } else {
                let time = (new Date() - this.props.competitionsModifiedDate) / 1000;
                if (time > 30) {
                    this.props.getCompetitions(offset, this.state.limit + 1);
                    this.setState({ isFetching: true });
                }
            }
        }

    };

    nextPageHandler = (currentPage) => {
        let nextPage = currentPage + 1;
        let offset = (nextPage - 1) * this.state.limit;
        if (this.state.activeTab === 'users') {
            this.props.getUsers(offset, this.state.limit + 1);
            this.setState({ currentUsersPage: nextPage, lastUsersPage: nextPage, isFetching: true });
        } else {
            this.props.getCompetitions(offset, this.state.limit + 1);
            this.setState({ currentCompetitionsPage: nextPage, lastCompetitionsPage: nextPage, isFetching: true });
        }
    };

    previousPageHandler = (currentPage) => {
        let nextPage = currentPage - 1;
        let offset = (nextPage - 1) * this.state.limit;
        if (this.state.activeTab === 'users') {
            this.props.getUsers(offset, this.state.limit + 1);
            this.setState({ currentUsersPage: nextPage, nextUsersPage: nextPage, isFetching: true });
        } else {
            this.props.getCompetitions(offset, this.state.limit + 1);
            this.setState({ currentCompetitionsPage: nextPage, nextCompetitionsPage: nextPage, isFetching: true });
        }
    };

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-md-12">
                        <div className="portlet light">
                            <div className="portlet-title mb-4">
                                <div className="caption">    
                                    <span className="caption-subject" style={{fontSize: '24px'}}> Gallery</span>     
                                </div>        
                            </div>
                            <div className="portlet-body">
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <button onClick={() => this.activeTabHandler('users')} className={"nav-link" + (this.state.activeTab === 'users' ? ' active' : '')} role="tab">Users</button>
                                            </li>
                                            <li className="nav-item">
                                                <button onClick={() => this.activeTabHandler('competitions')} className={"nav-link" + (this.state.activeTab === 'competitions' ? ' active' : '')} role="tab">Competitions</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content p-4" style={{ backgroundColor: 'white' }}>
                                            <div className={"tab-pane fade" + (this.state.activeTab === 'users' ? ' show active' : '')} role="tabpanel">
                                                <div className="row">
                                                    {this.props.users.map((item, index) => {
                                                        if (this.state.currentUsersPage !== this.state.nextUsersPage && index === this.props.users.length - 1) return [];
                                                        let shapes = item.drawings && item.drawings.length ? item.drawings[item.drawings.length - 1].shapes : null;
                                                        return <div key={index} className='col-md-3'>
                                                            <GalleryCard name={item.username} shapes={shapes} link={("/gallery/user/" + item.id)} action='VIEW' />
                                                        </div>
                                                    })}
                                                </div>
                                                <div className='row'>
                                                    {!this.props.users.length &&
                                                        <div className='col-md-12'>
                                                            <div className="alert alert-secondary" role="alert">
                                                                No users.
                                            </div>
                                                        </div>}
                                                </div>
                                                {!!this.props.users.length &&
                                                    <Pagination
                                                        currentPage={this.state.currentUsersPage}
                                                        nextPage={this.state.nextUsersPage}
                                                        nextPageHandler={this.nextPageHandler}
                                                        previousPageHandler={this.previousPageHandler} />}
                                            </div>
                                            <div className={"tab-pane fade" + (this.state.activeTab === 'competitions' ? ' show active' : '')} role="tabpanel">
                                                <div className='row'>
                                                    {this.props.competitions.map((item, index) => {
                                                        if (this.state.currentCompetitionsPage !== this.state.nextCompetitionsPage && index === this.props.competitions.length - 1) return [];
                                                        let shapes = item.drawings && item.drawings.length ? item.drawings[item.drawings.length - 1].shapes : null;
                                                        let action = item.votingEndDate > new Date() ? 'VOTE' : 'VIEW';
                                                        //console.log('action', action);
                                                        return <div key={item.id} className='col-md-3' >
                                                            <GalleryCard name={item.name} shapes={shapes} link={("/gallery/competition/" + item.id)} action={action} />
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
                                                        currentPage={this.state.currentCompetitionsPage}
                                                        nextPage={this.state.nextCompetitionsPage}
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
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        users: state.users.users,
        competitions: state.competitions.competitions,
        drawings: state.drawings.drawings,
        usersModifiedDate: state.users.modifiedDate,
        competitionsModifiedDate: state.competitions.modifiedDate
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCompetitions: (offset, limit) => dispatch(actions.AsyncGetCompetitions(offset, limit)),
        getUsers: (offset, limit) => dispatch(actions.AsyncGetUsers(offset, limit))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);