import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Login extends React.Component {
    state = {
        username: '',
        password: '',
        authorized: false
    }

    render() {
        return (
            <div className="Signin">
                <h1>Sign In</h1>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input
                            value={this.state.username}
                            onCharge={this.inputChangeHandler}
                            placeholder="Username"
                            type="text"
                            name="username" />
                    </div>
                    <div>
                        <input
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            placeholder="Password"
                            type="password"
                            name="password" />
                    </div>
                    <div>
                        <button type="submit">
                            Sign In
                        </button>
                        <Link to="/Register"> <a> Need an account? Click here to Register</a></Link>
                    </div>
                    {this.state.authorized ? <Link to="/play"> Play </Link> : null}
                </form>
            </div>
        );
    }
    inputChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    };
    submitHandler = event => {
        event.preventDefault();
        const credentials = {
            username: this.state.username,
            password: this.state.password
        }
        const local = 'http://127.0.0.1:3000'
        // const herokurl = 'https://lambda-mud-test.herokuapp.com/'
        axios.post(`${local}/api/login`, credentials).then(res => {
            console.log(res.data);
            const token = res.data.key;
            localStorage.setItem('key', token);
            this.setState({ authorized: true });
        })
            .catch(err => {
                console.error(err.response);
            });
        console.log('state', this.state);
    };
}




export default Login; 