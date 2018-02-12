import React from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';

import { AuthenticationModal } from '../../store/actions/actions';

const Modal = function (props) {

    return (
        <ReactModal
            isOpen={props.show}
            ariaHideApp={false}
            onRequestClose={props.authenticationModal}
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

function mapDispatchToProps(dispatch) {
    return { authenticationModal: () => dispatch(AuthenticationModal(false)) }
}

export default connect(null, mapDispatchToProps)(Modal);