import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { manageCompetitionModal } from '../../store/actions/actions';

import './Landing.css';

const Landing = function (props) {

    return (
        <div className="container jumbotron jumbotron-fluid align-self-center text-center landing">
            <div className="container-fluid">
                <h1 className="display-1">Vector Art Champions</h1>
                <p className="lead w-75 mx-auto mb-4">Do you want to beat your best friend and become a legend? Join to an active competition and start making your art, or register and create your own competition with your topic.</p>
                <div>
                    <Link className="btn vac-btn-primary btn-lg m-1" to='/canvas'>Draw for fun</Link>
                    <button
                        type='button'
                        className="btn vac-btn-primary btn-lg m-1"
                        onClick={() => {
                            props.manageCompetitionModal('start', true)
                        }}>Join to competition</button>
                    <Link className="btn vac-btn-primary btn-lg m-1" to='/gallery'>Browse galleries</Link>
                    {props.auth.isLoged ? <Link className="btn vac-btn-primary btn-lg m-1" to='/gallery/'>Vote for arts</Link> : null}
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = function (dispatch) {
    return {
        manageCompetitionModal: (component, show) => dispatch(manageCompetitionModal(component, show))
    };
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);