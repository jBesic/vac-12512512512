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

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Main>
          <Spinner show={this.props.auth.isFetching} />
          <Modal show={this.props.auth.loginActive || this.props.auth.registerActive}>
            {this.props.auth.loginActive || this.props.auth.registerActive ?
              <Authentication />
              : null}
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
    auth: state.auth
  };
}

export default withRouter(connect(mapStateToProps)(App));
