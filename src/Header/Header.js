import React from 'react';

import HeaderMenu from './HeaderMenu';
import './Header.css'

const Header = () => {
    return (
        <header className="header shadow">
            <div className="container">
                <div className="row">
                    <div className="header-title">
                        <div className="header-logo">
                            <img src="/firebase-icon.svg" alt="firebase-icon"/>
                        </div>
                        <h2>Firebase Client</h2>
                        
                    </div>
                    <div className="header-menu">
                        <HeaderMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;