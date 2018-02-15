import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from './Modal';

import Navigation from './Navigation/Navigation';
import Authentication from './Authentication';
import Main from './Main/Main';
import Landing from './Landing/Landing';
import Canvas from '../containers/Canvas/Canvas';
import CompetitionsPage from './CompetitionsPage';
import Spinner from './Spinner/Spinner';
import CreateEditCompetition from '../containers/CreateEditCompetition';
import StartCompetition from '../containers/StartCompetition';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Main>
          <Spinner show={this.props.auth.isFetching || this.props.competitions.isFetching} />
          <Modal show={this.props.auth.loginActive || this.props.auth.registerActive}>
            <Authentication />
          </Modal>
          <Modal show={this.props.competitions.createCompetition || this.props.competitions.editCompetition}>
            <CreateEditCompetition />
          </Modal>
          <Modal show={this.props.competitions.startCompetition}>
            <StartCompetition />
          </Modal>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/canvas' component={Canvas} />
            <Route exact path='/competitions' component={CompetitionsPage} />
            <Redirect to='/' />
          </Switch>
        </Main>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    competitions: state.competitions
  };
}

export default withRouter(connect(mapStateToProps)(App));
