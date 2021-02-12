import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import MainContent from './MainContent';
import Registration from './Registration';
import Account from './Account';

import './Main.css'

const Main = () => {


    return (
        <main className="main">
            <div className="container">
                <AnimatePresence exitBeforeEnter>
                    <Switch>
                        <Route path="/" exact>
                            <MainContent />
                        </Route>
                        <Route path="/registration">
                            <Registration />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/account">
                            <Account />
                        </Route>
                    </Switch>
                </AnimatePresence>
            </div>
        </main>
    );
};

export default Main;