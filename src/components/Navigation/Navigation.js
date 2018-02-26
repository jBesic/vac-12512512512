import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo2.png'

import { AsyncLogoutUser, AuthenticationModal, updateNotifications } from '../../store/actions/actions';
import './Navigation.css';

import { slide as Menu } from 'react-burger-menu';

let styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenu: {
        background: 'white',
        padding: '15px 0'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
};


class Navigation extends Component {
    state = { show: false };

    toggleMenu = () => {
        this.setState({ show: !this.state.show });
        let newNotifications = this.props.notifications.filter(item => !item.isDisplayed);
        if (newNotifications.length) {
            this.props.updateNotifications();
        }
    };

    handleStateChange = (state) => {
        this.setState({ show: state.isOpen })
    };
    render() {
        return (<React.Fragment>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light vac-navbar">
                <NavLink className="navbar-brand" to="/">
                    <img src={logo} alt='' />
                </NavLink>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav justify-content-end">
                        {
                            this.props.auth.isLoged ? null :
                                <li className="nav-item">
                                    <button
                                        type='button'
                                        className="btn btn-link nav-link"
                                        onClick={() => this.props.modal('register', true)}>Register</button>
                                </li>
                        }
                        {
                            this.props.auth.isLoged ? null :
                                <li className="nav-item">
                                    <button
                                        type='button'
                                        className="btn btn-link nav-link"
                                        onClick={() => this.props.modal('login', true)}>Login</button>
                                </li>
                        }
                        {
                            !this.props.auth.isLoged ? null :
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                </li>
                        }
                        {
                            !this.props.auth.isLoged ? null :
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/gallery">Gallery</NavLink>

                                </li>
                        }
                        {
                            !this.props.auth.isLoged ? null :
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/competitions">Competitions</NavLink>
                                </li>}

                        {
                            !this.props.auth.isLoged ? null :
                                <li className="nav-item">
                                    <button
                                        type='button'
                                        className="btn btn-link nav-link"
                                        onClick={this.toggleMenu}>
                                        Notifications
                                        {!!this.props.numberOfNewNotifications &&
                                            <span className="numberCircle">
                                                <span>{this.props.numberOfNewNotifications}</span>
                                            </span>}
                                    </button>
                                </li>
                        }
                        {
                            !this.props.auth.isLoged ? null :
                                <li className="nav-item">
                                    <button
                                        type='button'
                                        className="btn btn-link nav-link"
                                        onClick={() => this.props.logout()}>Logout</button>
                                </li>
                        }
                    </ul>
                </div>
            </nav>
            <Menu width={'25%'} isOpen={this.state.show} styles={styles} right onStateChange={(state) => this.handleStateChange(state)}>
                <div className="card" style={{ border: 'none' }}>
                    <div className="card-header font-weigth-bold" style={{ backgroundColor: 'white' }}>
                        Notifications
                    </div>
                    <div className="card-block">
                        {this.props.notifications.map(item => {
                            let notificationDate = formatDate(new Date(item.notificationDate));
                            if (item.type === 'VOTING-END') {
                                return <div key={item.id} className="notice success small">
                                    <p><span className='font-weight-bold'>{item.competition.name} |</span> Competition is over. </p>
                                    <p className='mt-1'><span>{notificationDate}</span>
                                        <NavLink to={"/gallery/competition/" + item.competitionId}><span onClick={this.toggleMenu} className='ml-1'> See results</span></NavLink>
                                    </p>
                                </div>;
                            } else {
                                return <div key={item.id} className="notice info small">
                                    <p><span className='font-weight-bold'>{item.competition.name} |</span> Voting time has started. </p>
                                    <p className='mt-1'><span>{notificationDate}</span>
                                        <NavLink to={"/gallery/competition/" + item.competitionId}><span onClick={this.toggleMenu} className='ml-1'> Vote now</span></NavLink></p>
                                </div>
                            }
                        })}
                        {(!this.props.notifications || !this.props.notifications.length) &&
                            <div className="notice info small">
                                <p><span className='font-weight-bold'>No notifications.</span></p>
                            </div>}
                    </div>
                </div>
            </Menu></React.Fragment>

        );
    };
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        notifications: state.notifications.notifications,
        numberOfNewNotifications: state.notifications.numberOfNewNotifications
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(AsyncLogoutUser()),
        modal: (component, show) => dispatch(AuthenticationModal(component, show)),
        updateNotifications: () => dispatch(updateNotifications())
    }
}

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();


    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours + ':' + minutes;
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);