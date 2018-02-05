import React from 'react';

const Main = function (props) {
    return (
        <main {...props} className='container-fluid d-flex main'>
            {props.children}    
        </main>
    );
}

export default Main;