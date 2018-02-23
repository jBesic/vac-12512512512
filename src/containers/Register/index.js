import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AsyncRegisterUser } from '../../store/actions/actions';

class Register extends Component {
    constructor(props) {
        super();

        this.setPropertyByName = this.setPropertyByName.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            error: ''
        };
    }

    setPropertyByName(propertyKey, value) {
        this.setState({
            [propertyKey]: value
        });
    }

    submitHandler(ev) {
        ev.preventDefault();
        this.props.registerDispatch(this.state.username, this.state.password, this.props.auth.payload);
    }

    render() {
        const isInvalid = this.state.username === '' || this.state.password === '' || this.state.password !== this.state.repeatPassword;

        return (
            <form className='d-block w-100' onSubmit={this.submitHandler}>
                {this.props.auth.message ? <div className="alert alert-danger">{this.props.auth.message}</div> : null}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        onChange={ev => this.setPropertyByName('username', ev.target.value)}
                        value={this.state.username}
                        autoFocus
                        placeholder="Enter an username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={ev => this.setPropertyByName('password', ev.target.value)}
                        value={this.state.password}
                        placeholder="Password"
                        autoComplete="false" />
                </div>
                <div className="form-group">
                    <label htmlFor="repeat-password">Repeat Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="repeat-password"
                        onChange={ev => this.setPropertyByName('repeatPassword', ev.target.value)}
                        value={this.state.repeatPassword}
                        placeholder="Repeat Password"
                        autoComplete="false" />
                </div>
                <button
                    disabled={isInvalid}
                    type="submit"
                    className="btn btn-block btn-primary vac-btn-primary">Register</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerDispatch: (username, password, payload = null) => dispatch(AsyncRegisterUser(username, password, payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);