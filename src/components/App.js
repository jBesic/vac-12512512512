import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './Navigation/Navigation';
import Main from './Main/Main';
import Landing from './Landing/Landing';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Main>
          <Switch>
            <Route exact path='/' component={Landing} />
          </Switch>
        </Main>
      </React.Fragment>
    );
  }
}

export default App;
