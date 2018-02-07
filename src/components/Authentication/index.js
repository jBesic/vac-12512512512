import React, { Component } from 'react';

import Register from '../../containers/Register';
import Login from '../../containers/Login';
import './authentication.css';

class Authentication extends Component {
    constructor(props) {
        super();

        this.state = {
            loginActive: props.loginActive,
            registerActive: props.registerActive
        };

        this.loginActive = this.loginActive.bind(this);
        this.registerActive = this.registerActive.bind(this);
    }

    loginActive() {
        this.setState({
            loginActive: true,
            registerActive: false
        });
    }

    registerActive() {
        this.setState({
            loginActive: false,
            registerActive: true
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="btn-group d-block mb-4" role='group'>
                    <button
                        type="button"
                        className={"btn w-50 vac-btn-primary vac-btn-modal" + (this.state.loginActive ? ' active' : '')}
                        onClick={this.loginActive}>Login</button>
                    <button
                        type="button"
                        className={"btn w-50 vac-btn-primary vac-btn-modal" + (this.state.registerActive ? ' active' : '')}
                        onClick={this.registerActive}>Register</button>
                </div>
                {this.state.registerActive ? <Register /> : null}
                {this.state.loginActive ? <Login /> : null}
            </React.Fragment>
        );
    }
};

export default Authentication;