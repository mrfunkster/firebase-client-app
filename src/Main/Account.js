import React, { Component } from 'react';
import { motion } from 'framer-motion'
import { connect } from 'react-redux';
import ScrollToTopOnMount from '../common/ScrollToTopOnMount';

import { enterEditMode, updateUserInfo } from '../common/store/actions'

class Account extends Component {

    state = {
        name: "",
        lastName: "",
        country: "",
        city: "",
        age: ""
    };

    copyCurrentDataToState = () => {
        this.setState({
            name: this.props.userData.name ? this.props.userData.name : "",
            lastName: this.props.userData.lastName ? this.props.userData.lastName : "",
            country: this.props.userData.country ? this.props.userData.country : "",
            city: this.props.userData.city ? this.props.userData.city : "",
            age: this.props.userData.age ? this.props.userData.age : "",
        });
    };

    inputHandler = (e) => {
        e.persist();
        this.setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    submitHandler = (e) => {
        e.preventDefault();
        let formData = {
            name: this.state.name,
            lastName: this.state.lastName,
            country: this.state.country,
            city: this.state.city,
            age: this.state.age,
            email: this.props.userData.email,
            password: this.props.userData.password
        }
        this.props.updateUserInfo(formData, this.props.userID)
    }

    render() {
        const {
            userData,
            enterEditMode,
            editMode,
            isLoading,
        } = this.props;
        return (
            <motion.div className="container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, transition: 'ease-in-out' }}
            >
                <div className="row">
                    <div className="col">
                        <h2 className="main-title">Account</h2>
                        <div className="main-description">
                            <h3>Your account info:</h3>
                        </div>
                        <div className="account-info">
                            <div className="row">
                                <div className="col input-name">
                                    <p><b>E-mail:</b></p>
                                </div>
                                <div className="col input-field">
                                    <p>{userData.email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col input-name">
                                    <p><b>Password:</b></p>
                                </div>
                                <div className="col input-field">
                                    <p>{userData.password}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row centered">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <h3>Additional info:</h3>
                        {
                            !editMode && 
                            <button className="edit-btn btn btn-outline-primary"
                                onClick={() => {
                                    this.copyCurrentDataToState();
                                    enterEditMode();
                                }}
                            >Edit</button>
                        }
                    </div>
                </div>
                <div className="row centered">
                    <form onSubmit={this.submitHandler} className="account-form">
                        {
                            isLoading && 
                            <div className="overlay">
                                <div className="overlay-loader">
                                    <div className="spinner-border text-danger" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="fields">
                            <div className="row">
                                <div className="col input-name">
                                    <p><b>Name:</b></p>
                                </div>
                                <div className="col input-field">
                                    {
                                        editMode ? 
                                        <input type="text" className="shadow"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.inputHandler}
                                        /> :
                                        <p>{!userData.name ? "-" : userData.name}</p>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col input-name">
                                    <p><b>Last Name:</b></p>
                                </div>
                                <div className="col input-field">
                                    {
                                        editMode ? 
                                        <input type="text" className="shadow"
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={this.inputHandler}
                                        /> :
                                        <p>{!userData.lastName ? "-" : userData.lastName}</p>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col input-name">
                                    <p><b>Country:</b></p>
                                </div>
                                <div className="col input-field">
                                    {
                                        editMode ? 
                                        <input type="text" className="shadow"
                                            name="country"
                                            value={this.state.country}
                                            onChange={this.inputHandler}
                                        /> :
                                        <p>{!userData.country ? "-" : userData.country}</p>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col input-name">
                                    <p><b>City:</b></p>
                                </div>
                                <div className="col input-field">
                                    {
                                        editMode ? 
                                        <input type="text" className="shadow"
                                            name="city"
                                            value={this.state.city}
                                            onChange={this.inputHandler}
                                        /> :
                                        <p>{!userData.city ? "-" : userData.city}</p>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col input-name">
                                    <p><b>Age:</b></p>
                                </div>
                                <div className="col input-field">
                                    {
                                        editMode ? 
                                        <input type="text" className="shadow"
                                            name="age"
                                            value={this.state.age}
                                            onChange={this.inputHandler}
                                        /> :
                                        <p>{!userData.age ? "-" : userData.age}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            editMode && 
                            <div className="button-input">
                                {
                                    !isLoading ?
                                        <button className="btn btn-outline-success"
                                            onClick={() => this.submitHandler}
                                        >Save</button>
                                    :
                                        <div className="spinner-border text-success" role="status"></div>
                                }
                            </div>
                        }
                        
                    </form>
                </div>
                <ScrollToTopOnMount />
            </motion.div>
        );
    };
};

const mapStateToProps = state => ({
    userData: state.app.userData,
    userID: state.app.userID,
    editMode: state.app.editMode,
    isLoading: state.app.showLoader,
});

const mapDispatchToProps = {
    enterEditMode,
    updateUserInfo
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);