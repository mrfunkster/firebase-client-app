import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../common/history";

import { logOut } from '../common/store/actions'

const HeaderMenu = ({
    logOut,
    userID,
}) => {

    if(!userID.length) {
        return (
            <ul className="nav-menu">
                <li><Link to="/login">Sign In</Link></li>
                <li className="btn btn-success"
                    onClick={() => {
                        history.push('/registration')
                    }}
                >Sign Up</li>
            </ul>
        );
    } else {
        return (
            <ul className="nav-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/account">Account</Link></li>
                <li className="btn btn-danger"
                    onClick={() => {
                        logOut();
                    }}
                >Log Out</li>
            </ul>
        );
    }
};

const mapDispatchToProps = {
    logOut
}

const mapStateToProps = state => ({
    userID: state.app.userID,

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderMenu);