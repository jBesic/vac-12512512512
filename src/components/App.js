import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Main from './Main/Main';
import Landing from './Landing/Landing';
import Canvas from '../containers/Canvas/Canvas';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Main>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/canvas' component={Canvas} />
          </Switch>
        </Main>
      </React.Fragment>
    );
  }
}

export default App;
