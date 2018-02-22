import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawingModal from '../DrawingModal/DrawingModal';
import Drawing from '../Drawing/Drawing';
import Pagination from '../Pagination/Pagination';
import * as actions from '../../store/actions/actions';
import '../../containers/Gallery/Gallery.css';
import requireAuthentication from '../../hoc/requireAuthentication';


class UserGallery extends Component {
    state = {
        showModal: false,
        selectedDrawing: null,
        nextPage: 1,
        currentPage: 1,
        limit: 8,
        isFetching: true,
        userId: null,
        user: {}
    };

    componentDidMount = () => {
        let userId = this.props.match.params.userId;
        let data = { userId, offset: 0, limit: this.state.limit + 1 };
        this.props.getUserGallery(data);
        this.setState({ userId, user: this.props.selectedUser });
    };

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.selectedUser.drawings) return;
        if (this.state.user !== nextProps.selectedUser) {
            let nextPage = nextProps.selectedUser.drawings.length < (this.state.limit + 1) ? this.state.nextPage : (this.state.nextPage + 1);
            this.setState({ nextPage, user: nextProps.selectedUser });
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
        let data = { userId: this.state.userId, limit: this.state.limit + 1, offset };
        this.props.getUserGallery(data);
        this.setState({ currentPage: nextPage });
    };

    previousPageHandler = (currentPage) => {
        let nextPage = currentPage - 1;
        let offset = (nextPage - 1) * this.state.limit;
        let data = { userId: this.state.userId, limit: this.state.limit + 1, offset }
        this.props.getUserGallery(data);
        this.setState({ currentPage: nextPage, nextPage: nextPage });
    };

    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <div className="card col-md-12">
                            <div className="card-header text-secondary vac-page-title">
                                Gallery
                                {this.props.selectedUser && <span> | <span className='small'>Username: {this.props.selectedUser.username}</span></span>}
                            </div>
                            <div className="card-body vac-page-body">
                                <div className='row'>
                                    {this.props.selectedUser.drawings && this.props.selectedUser.drawings.map((drawing, index) => {
                                        if (this.state.currentPage !== this.state.nextPage && index === this.props.selectedUser.drawings.length - 1) return [];
                                        return <Drawing key={drawing.id} name={drawing.name} shapes={drawing.shapes} onDrawingClick={() => this.showDrawingModalHandler(drawing)} />;
                                    })}
                                </div>
                                {this.props.selectedUser.drawings && !!this.props.selectedUser.drawings.length &&
                                    <Pagination
                                        currentPage={this.state.currentPage}
                                        nextPage={this.state.nextPage}
                                        nextPageHandler={this.nextPageHandler}
                                        previousPageHandler={this.previousPageHandler} />}

                                {!this.props.selectedUser &&
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className="alert alert-secondary" role="alert">
                                                There is no user with ID {this.state.userId}.
                                                </div>
                                        </div>
                                    </div>}

                                {this.props.selectedUser.drawings && !this.props.selectedUser.drawings.length &&
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
            </React.Fragment >
        );
    };
}

const mapStateToProps = state => {
    return {
        selectedUser: state.gallery.selectedUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserGallery: (data) => dispatch(actions.AsyncGetUserGallery(data))
    }
};

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(UserGallery));