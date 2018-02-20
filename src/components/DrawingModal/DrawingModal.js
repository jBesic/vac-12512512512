import React from 'react';
import ReactModal from 'react-modal';
import Shape from '../Shape/Shape';

const DrawingModal = (props) => {
    let shapes = props.drawing.shapes;
    return (
        <ReactModal
            isOpen={props.show}
            ariaHideApp={false}
            onRequestClose={props.closeModal}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,.7)',
                    zIndex: '9999'
                },
                content: {
                    backgroundColor: 'white',
                    border: '1px solid',
                    bottom: 'auto',
                    left: '50%',
                    maxWidth: '1000px',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    right: 'auto',
                    width: '100%'
                }
            }}>
            <div>
                {props.drawing && <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" width='100%' height='100%' >
                    {shapes && shapes.map((item, index) => {
                        return <Shape type={item.type} key={item.id} text={item.text} points={item.points} style={item.attributes} />
                    })}
                </svg>}
            </div>
        </ReactModal>
    );
};

export default DrawingModal;