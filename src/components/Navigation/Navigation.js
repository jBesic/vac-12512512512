import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo2.png'

import { AsyncLogoutUser, AuthenticationModal } from '../../store/actions/actions';
import './Navigation.css';

const Navigation = function (props) {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light vac-navbar">
            <NavLink className="navbar-brand" to="/">
                <img src={logo} alt='' />
            </NavLink>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav justify-content-end">
                    {
                        props.auth.isLoged ? null :
                            <li className="nav-item">
                                <button
                                    type='button'
                                    className="btn btn-link nav-link"
                                    onClick={() => props.modal('register', true)}>Register</button>
                            </li>
                    }
                    {
                        props.auth.isLoged ? null :
                            <li className="nav-item">
                                <button
                                    type='button'
                                    className="btn btn-link nav-link"
                                    onClick={() => props.modal('login', true)}>Login</button>
                            </li>
                    }
                    {
                        !props.auth.isLoged ? null :
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                    }
                    {
                        !props.auth.isLoged ? null :
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/gallery">Gallery</NavLink>

                            </li>
                    }
                    {
                        !props.auth.isLoged ? null :
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/competitions">Competitions</NavLink>
                            </li>}
                    {
                        !props.auth.isLoged ? null :
                            <li className="nav-item">
                                <button
                                    type='button'
                                    className="btn btn-link nav-link"
                                    onClick={() => props.logout()}>Logout</button>
                            </li>
                    }
                    {
                        !props.auth.isLoged ? null :
                            <li className="nav-item d-flex align-items-center" style={{
                                cursor: 'default',
                                color: '#FF5722'
                                }}>
                                <i className="fa fa-user"></i><span className='d-inline-block ml-2'>{props.auth.userName}</span>
                            </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(AsyncLogoutUser()),
        modal: (component, show) => dispatch(AuthenticationModal(component, show))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);