import React from 'react';
import { motion } from 'framer-motion'
import { connect } from 'react-redux';
import ScrollToTopOnMount from '../common/ScrollToTopOnMount';
import { Link } from 'react-router-dom';

const MainContent = ({
    userData
}) => {
    return (
        <motion.div className='container'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, transition: 'ease-in-out' }}
        >
            <div className="row">
                <div className="col">
                    <h2 className="main-title">{`Welcome back, ${userData.email}`}</h2>
                    <div className="main-description">
                        <p>If you want to get more detail about your account, visit <Link to="/account">account</Link> page.</p>
                    </div>
                </div>
                <ScrollToTopOnMount />
            </div>
        </motion.div>
    );
};

const mapStateToProps = state => ({
    userData: state.app.userData
})

export default connect(
    mapStateToProps
)(MainContent);