import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import MainContent from './MainContent';
import Registration from './Registration';
import Account from './Account';

import './Main.css'

const Main = ({
    userID
}) => {
    return (
        <main className="main">
            <AnimatePresence exitBeforeEnter>
                <Switch>
                    <Route path="/" exact>
                        {!userID.length ? <Redirect to="/login"/> :  <MainContent/>}
                    </Route>
                    <Route path="/registration">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/account">
                        {!userID.length ? <Redirect to="/login"/> :  <Account/>}
                    </Route>
                </Switch>
            </AnimatePresence>
        </main>
    );
};

const mapStateToProps = state => ({
    userID: state.app.userID
})

export default connect(
    mapStateToProps
)(Main);