import React, { Component } from 'react';
import { connect } from 'react-redux';

const requireAuthentication = function (WrapperComponent) {
    class Authenticated extends Component {
        constructor(props) {
            super();

            if (!props.auth.isLoged) {
                props.history.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.auth.isLoged) {
                nextProps.history.push('/login');
            }
        }

        render() {
            return <WrapperComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.auth
        }
    }

    return connect(mapStateToProps)(Authenticated);
}

export default requireAuthentication;