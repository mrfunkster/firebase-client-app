import React from 'react';
import { motion } from 'framer-motion'
import { connect } from 'react-redux';

const Account = ({
    userData
}) => {
    return (
        <motion.div className="row"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, transition: 'ease-in-out' }}
        >
            <div className="col">
                <h2 className="main-title">Account</h2>
                <p className="main-description">Your account info:</p>
                <div className="account-info">
                    <div className="row">
                        <div className="col text-end">
                            <p>E-mail:</p>
                        </div>
                        <div className="col">
                            <p>{userData.email}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-end">
                            <p>Password:</p>
                        </div>
                        <div className="col">
                            <p>{userData.password}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const mapStateToProps = state => ({
    userData: state.app.userData
})

export default connect(
    mapStateToProps
)(Account);