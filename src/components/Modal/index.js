import React from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';

import {
    AuthenticationModal,
    createEditCompetitionModal
} from '../../store/actions/actions';

const Modal = function (props) {
    let onRequestCloseHandler;
    if (props.auth.loginActive || props.auth.registerActive) {
        onRequestCloseHandler = props.authenticationModal;
    }
    if (props.competitions.createCompetition || props.competitions.editCompetition) {
        onRequestCloseHandler = props.createEditCompetitionModal;
    }
    return (
        <ReactModal
            isOpen={props.show}
            ariaHideApp={false}
            onRequestClose={onRequestCloseHandler}
            style={{
                overlay: {
                    zIndex: '9999'
                },
                content: {
                    bottom: 'auto',
                    left: '50%',
                    maxWidth: '400px',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    right: 'auto',
                    width: '100%'
                }
            }}>
            {props.children}
        </ReactModal>
    );
};

const mapStateToProps = state => {
    return {
        competitions: { ...state.competitions },
        auth: { ...state.auth }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authenticationModal: () => dispatch(AuthenticationModal(false)),
        createEditCompetitionModal: () => dispatch(createEditCompetitionModal(false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);