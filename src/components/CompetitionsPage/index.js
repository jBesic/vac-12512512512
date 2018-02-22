import React, { Component } from 'react';
import { connect } from 'react-redux';

import { manageCompetitionModal } from '../../store/actions/actions';
import DrawTabContent from '../DrawTabContent';
import VoteTabContent from '../VoteTabContent';
import JoinedTabContent from '../JoinedTabContent';
import OwnTabContent from '../OwnTabContent';
import requireAuthentication from '../../hoc/requireAuthentication';

class CompetitionsPage extends Component {
    constructor(props) {
        super();

        this.state = {
            activeTab: 'draw-tab'
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 card">
                        <div className="card-header text-secondary vac-page-title">Competitions</div>
                        <div className="card-body vac-page-body">
                            <div className='row'>
                                <div className='col-md-12'>
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <button
                                                className={"nav-link" + (this.state.activeTab === 'draw-tab' ? ' active' : '')} role="tab"
                                                onClick={() => {
                                                    this.setState({ activeTab: 'draw-tab' });
                                                }}>Draw</button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={"nav-link" + (this.state.activeTab === 'vote-tab' ? ' active' : '')} role="tab"
                                                onClick={() => {
                                                    this.setState({ activeTab: 'vote-tab' });
                                                }}>Vote</button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={"nav-link" + (this.state.activeTab === 'joined-tab' ? ' active' : '')} role="tab"
                                                onClick={() => {
                                                    this.setState({ activeTab: 'joined-tab' });
                                                }}>Joined</button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={"nav-link" + (this.state.activeTab === 'own-tab' ? ' active' : '')} role="tab"
                                                onClick={() => {
                                                    this.setState({ activeTab: 'own-tab' });
                                                }}>Own</button>
                                        </li>
                                        <li className="nav-item ml-auto">
                                            <button
                                                type='button'
                                                className='ml-auto btn vac-btn-primary'
                                                onClick={() => {
                                                    this.props.manageCompetitionModal('create', true);
                                                }}>Add New</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content p-4" style={{ backgroundColor: 'white' }}>
                                        {this.state.activeTab === 'draw-tab' ? (
                                            <div className="tab-pane fade show active" role="tabpanel">
                                                <DrawTabContent />
                                            </div>
                                        ) : null}
                                        {this.state.activeTab === 'vote-tab' ? (
                                            <div className="tab-pane fade show active" role="tabpanel">
                                                <VoteTabContent />
                                            </div>
                                        ) : null}
                                        {this.state.activeTab === 'joined-tab' ? (
                                            <div className="tab-pane fade show active" role="tabpanel">
                                                <JoinedTabContent />
                                            </div>
                                        ) : null}
                                        {this.state.activeTab === 'own-tab' ? (
                                            <div className="tab-pane fade show active" role="tabpanel">
                                                <OwnTabContent />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = function (state) {
    return {
        competitions: [...state.competitions.competitions],
        modifiedDate: state.competitions.modifiedDate
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        manageCompetitionModal: (component, show) => dispatch(manageCompetitionModal(component, show))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(requireAuthentication(CompetitionsPage));