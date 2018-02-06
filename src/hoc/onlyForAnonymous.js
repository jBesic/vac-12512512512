import React, { Component } from 'react';
import { connect } from 'react-redux';

const onlyForAnonymous = function (WrapperComponent) {
    class Anonymous extends Component {
        constructor(props) {
            super();

            if (props.auth.isLoged) {
                props.history.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (nextProps.auth.isLoged) {
                nextProps.history.push('/');
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

    return connect(mapStateToProps)(Anonymous);
}

export default onlyForAnonymous;