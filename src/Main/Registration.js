import React, { Component } from 'react';
import { motion } from 'framer-motion'
import { connect } from 'react-redux';

import { registerWithByEmailAndPassword } from '../common/store/actions'

class Registration extends Component {

    state = {
        email: "",
        password: "",
        confirmPassword: "",
        isPassConfirmed: false,
        isFocused: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.formValidate() === 0) {
            let formData = {
                email: this.state.email,
                password: this.state.password,
            };
            this.props.registerWithByEmailAndPassword(formData);
        } else {
            alert("An Error Has Occured!")
        }
    };
    
    inputHandler = (e) => {
        e.persist();
        this.setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        if(e.target.name === "confirmPassword") {
            if(e.target.value !== this.state.password) {
                this.setState(prevState => ({
                    ...prevState,
                    isPassConfirmed: false
                }));
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    isPassConfirmed: true
                }));
            };
        };
    };

    formValidate = () => {
        let error = 0;
        if (!this.state.email) {
            error++;
        } else if (!this.state.password) {
            error++;
        } else if (!this.state.confirmPassword) {
            error++;
        } else if(!this.state.isPassConfirmed) {
            error++;
        };
        return error;
    };

    isFocused = () => {
        if(!this.state.isFocused) {
            this.setState(prevState => ({
                ...prevState,
                isFocused: true
            }));
        }
    }

    render() {
        const {
            isLoading
        } = this.props;
        return (
            <motion.div className="container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, transition: 'ease-in-out' }}
            >
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-8">
                        <h2 className="main-title">Registration</h2>
                        <p className="main-description">Welcome to Firebase Client App Registration Form. Please submit registration form below:</p>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-3 form-section shadow">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-input">
                                <label>Email:
                                    <input type="email" placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.inputHandler}
                                        className="shadow"
                                    />
                                </label>
                            </div>
                            <div className="form-input">
                                <label>Password:
                                    <input type="password" placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.inputHandler}
                                        className="shadow"
                                    />
                                </label>
                            </div>
                            <div className="form-input">
                                <label>Confirm Password:
                                    <input type="password" placeholder="Password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.inputHandler}
                                        className={this.state.isFocused ? (this.state.isPassConfirmed ? "shadow done" : "shadow error" ): "shadow"}
                                        onFocus={this.isFocused}
                                    />
                                </label>
                            </div>
                            <div className="button-input">
                                {
                                    !isLoading ?
                                        <button className="btn btn-success">Sign Up</button>
                                    : <div className="spinner-border text-success" role="status"></div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        );
    };
};

const mapDispatchToProps = {
    registerWithByEmailAndPassword
};

const mapStateToProps = state => ({
    isLoading: state.app.showLoader,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);