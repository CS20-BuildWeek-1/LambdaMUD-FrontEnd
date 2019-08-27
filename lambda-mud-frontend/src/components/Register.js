import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: ""
  };

  inputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    const herokurl = "https://lambda-mud-test.herokuapp.com";
    e.preventDefault();

    axios({
      url: `${herokurl}/api/registration/`,
      method: "POST",
      data: {
        username: `${this.state.username}`,
        password1: `${this.state.password1}`,
        password2: `${this.state.password2}`,
        email: `${this.state.email}`
      }
    })
      .then(res => {
        console.log("response", res);
        const token = res.data["key"];
        localStorage.setItem("token", `Token ${token}`);
        this.props.history.push("/adventure");
      })
      .catch(err => {
        console.log("Axios error:", err.response);
      });
  };

  render() {
    return (
      <div className="login-page">
        <div className="outer-div">
          <div className="link-buttons">
            <Link to={`/`}>Login</Link>
            <Link to={`/register`}>Register</Link>
          </div>
          <div className="inner-div">
            <form className="form-div" onSubmit={this.submitHandler}>
              <input
                value={this.state.username}
                onChange={this.inputChangeHandler}
                type="text"
                placeholder="Username"
                name="username"
              />
              <input
                value={this.state.email}
                onChange={this.inputChangeHandler}
                type="text"
                placeholder="Email"
                name="email"
              />
              <input
                value={this.state.password}
                onChange={this.inputChangeHandler}
                type="password"
                placeholder="Password"
                name="password1"
              />
              <input
                value={this.state.password}
                onChange={this.inputChangeHandler}
                type="password"
                placeholder="Re-enter Password"
                name="password2"
              />
              <button type="submit">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
