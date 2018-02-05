import React from 'react';
import { withRouter } from 'react-router-dom';

const Main = function (props) {
    return (
        <main className={'container-fluid d-flex main' + (props.location.pathname === '/' ? ' landing' : '')}>
            {props.children}
        </main>
    );
}

export default withRouter(Main);