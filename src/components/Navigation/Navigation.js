import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

const Navigation = function (props) {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light">
            <NavLink className="navbar-brand" to="/">Vector Art Champions</NavLink>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/gallery">Gallery</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/competitions">Competitions</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;