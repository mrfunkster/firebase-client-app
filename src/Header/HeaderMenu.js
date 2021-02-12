import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logOut } from '../common/store/actions'

const HeaderMenu = ({
    logOut,
    userID,
    isLoading
}) => {

    if(!userID.length) {
        return (
            <ul className="nav-menu">
                <li><Link to="/registration">Sign Up</Link></li>
                <li><Link to="/login" className="btn btn-success">Sign In</Link></li>
            </ul>
        );
    } else {
        return (
            <ul className="nav-menu">
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
    isLoading: state.app.showLoader
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderMenu);