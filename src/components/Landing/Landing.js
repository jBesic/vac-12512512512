import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Landing.css';

const Landing = function (props) {

    return (
        <div className="container jumbotron jumbotron-fluid align-self-center text-center landing">
            <div className="container-fluid">
                <h1 className="display-1">Vector Art Champions</h1>
                <p className="lead">Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pro</p>
                <div>
                    <Link className="btn vac-btn-primary btn-lg m-1" to='/canvas'>Draw for fun</Link>
                    <Link className="btn vac-btn-primary btn-lg m-1" to='/choose-competition'>Join to competition</Link>
                    <Link className="btn vac-btn-primary btn-lg m-1" to='/galleries'>Browse galleries</Link>
                    {props.auth.isLoged ? <Link className="btn vac-btn-primary btn-lg m-1" to='/galleries'>Vote for arts</Link> : null}
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Landing);