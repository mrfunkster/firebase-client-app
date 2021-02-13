import React, { Component } from 'react';
import { motion } from 'framer-motion'
import { connect } from 'react-redux';


import { authWithEmailAndPassword } from '../common/store/actions'
import { Link } from 'react-router-dom';

class Login extends Component {

    state = {
        email: "",
        password: "",
    }

    handleSubmit = e => {
        e.preventDefault();
        let formData = {
            email: this.state.email.trim(),
            password: this.state.password.trim(),
        };

        if (this.validateForm() === 0) {
            this.props.authWithEmailAndPassword(formData);
        } else {
            alert("Enter correct email/password!");
        };
    };
    
    inputHandler = (e) => {
        e.persist();
        this.setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    validateForm = () => {
        let error = 0;
        if (!this.state.email.length) {
            error++;
        } else if (this.state.password.length < 6) {
            error++;
        };
        return error;
    };

    render() {
        const { 
            isLoading,
        } = this.props
        return (
            <motion.div className="container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, transition: 'ease-in-out' }}
            >
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-8">
                        <h2 className="main-title">Login</h2>
                        <div className="main-description">
                            <p>Enter your email and password to sign in or </p>
                            <Link to="/registration">register</Link>
                        </div>
                    </div>
        
                    <div className="col-sm-12 col-md-4 col-lg-3 form-section shadow">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-input">
                                <label>Email:
                                    <input type="email" placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.inputHandler}
                                        disabled={isLoading}
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
                                        disabled={isLoading}
                                        className="shadow"
                                    />
                                </label>
                            </div>
                            <div className="button-input">
                                {
                                    !isLoading ? 
                                        <button className="btn btn-success">Login</button>
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
    authWithEmailAndPassword
};

const mapStateToProps = state => ({
    isLoading: state.app.showLoader,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)