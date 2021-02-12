import React from 'react';
import { motion } from 'framer-motion'
import { connect } from 'react-redux';
import history from '../common/history';

const MainContent = ({
    userData
}) => {
    if (!Object.keys(userData).length) {
        history.push('/login');
        return <></>
    } else {
        return (
            <motion.div className='row'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, transition: 'ease-in-out' }}
            >
                <div className="col">
                    <h2 className="main-title">{`Welcome back, ${userData.email}`}</h2>
                </div>
            </motion.div>
        );
    };
};

const mapStateToProps = state => ({
    userData: state.app.userData
})

export default connect(
    mapStateToProps
)(MainContent);