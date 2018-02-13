import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from './Modal';

import Navigation from './Navigation/Navigation';
import Authentication from './Authentication';
import Main from './Main/Main';
import Landing from './Landing/Landing';
import Canvas from '../containers/Canvas/Canvas';
import Spinner from './Spinner/Spinner';
import CreateEditCompetition from '../containers/CreateEditCompetition';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Main>
          <Spinner show={this.props.auth.isFetching} />
          <Modal show={this.props.auth.loginActive || this.props.auth.registerActive}>
            <Authentication />
          </Modal>
          <Modal show={this.props.competitions.createCompetition || this.props.competitions.editCompetition}>
            <CreateEditCompetition />
          </Modal>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/canvas' component={Canvas} />
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
