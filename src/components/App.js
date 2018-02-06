import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import onlyForAnonymous from '../hoc/onlyForAnonymous';
import Navigation from './Navigation/Navigation';
import Register from '../containers/Register';
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
          <Spinner show={this.props.auth.isFetching}/>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={onlyForAnonymous(Register)} />
            <Route exact path='/canvas' component={Canvas} />
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
