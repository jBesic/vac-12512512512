import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import Modal from './Modal';
import { checkForUserNotifications, clearNotificationsInterval } from '../store/actions/actions'
import Navigation from './Navigation/Navigation';
import Authentication from './Authentication';
import Main from './Main/Main';
import Landing from './Landing/Landing';
import Canvas from '../containers/Canvas/Canvas';
import CompetitionsPage from './CompetitionsPage';
import Spinner from './Spinner/Spinner';
import CreateEditCompetition from '../containers/CreateEditCompetition';
import StartCompetition from '../containers/StartCompetition';
import Gallery from '../containers/Gallery/Gallery';
import UserGallery from '../components/UserGallery/UserGallery';
import CompetitionGallery from '../components/CompetitionGallery/CompetitionGallery';
import VoteGallery from './VoteGallery/VoteGallery';

class App extends Component {

  componentDidMount = () => {
    if (localStorage.getItem('token')) {
      this.props.checkForUserNotifications();
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (this.props.auth.isLoged !== nextProps.auth.isLoged) {
      if (nextProps.auth.isLoged === true) {
        this.props.checkForUserNotifications();
      } else {
        this.props.clearNotificationsInterval();
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <ReduxToastr
          timeOut={1500}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar />

        <Navigation />
        <Main>
          <Spinner show={this.props.auth.isFetching || this.props.drawings.isFetching || this.props.competitions.isFetching || this.props.users.isFetching || this.props.gallery.isFetching} />
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
            <Route exact path='/vote' component={VoteGallery} />
            <Route exact path='/gallery' component={Gallery} />
            <Route exact path='/gallery/user/:userId' component={UserGallery} />
            <Route exact path='/gallery/competition/:competitionId' component={CompetitionGallery} />
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
    competitions: state.competitions,
    drawings: state.drawings,
    users: state.users,
    gallery: state.gallery
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkForUserNotifications: () => dispatch(checkForUserNotifications()),
    clearNotificationsInterval: () => dispatch(clearNotificationsInterval())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
