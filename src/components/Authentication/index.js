import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AuthenticationModal } from '../../store/actions/actions';
import Register from '../../containers/Register';
import Login from '../../containers/Login';
import './authentication.css';

class Authentication extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="btn-group d-block mb-4" role='group'>
                    <button
                        type="button"
                        className={"btn w-50 vac-btn-primary vac-btn-modal" + (this.props.auth.loginActive ? ' active' : '')}
                        onClick={() => this.props.modal('login', true, '', this.props.auth.payload)}>Login</button>
                    <button
                        type="button"
                        className={"btn w-50 vac-btn-primary vac-btn-modal" + (this.props.auth.registerActive ? ' active' : '')}
                        onClick={() => this.props.modal('register', true, '', this.props.auth.payload)}>Register</button>
                </div>
                {this.props.auth.registerActive ? <Register /> : null}
                {this.props.auth.loginActive ? <Login /> : null}
            </React.Fragment>
        );
    }
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modal: (component, show, message, payload = null) => dispatch(AuthenticationModal(component, show, message, payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);