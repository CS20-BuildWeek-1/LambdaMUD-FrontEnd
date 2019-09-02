import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Col, Form, FormGroup } from "reactstrap";
import "./Register.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
    // const testurl = "https://lambda-mud-test.herokuapp.com";
    const herokurl = "https://lambdamud007.herokuapp.com";
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
      <main>
        <div id="container">
          <div className="form-contain">
            <Form className="p-4" onSubmit={this.submitHandler}>
              <Col>
                <FormGroup>
                  <div className="form-subject">Register</div>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="&#128220; Email"
                    value={this.state.email}
                    onChange={this.inputChangeHandler}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <input
                    className="input"
                    type="text"
                    name="username"
                    id="exampleUsername"
                    placeholder="&#128128; Username"
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <input
                    className="input"
                    type="password"
                    name="password1"
                    id="examplePassword1"
                    placeholder="&#128273; Password"
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <input
                    className="input"
                    type="password"
                    name="password2"
                    id="examplePassword2"
                    placeholder="&#128273; Confirm Password"
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                  />
                </FormGroup>
              </Col>
              <button className="btn-success" type="submit">
                Create Account
              </button>
              <div className="alt-link">
                Already registered? <Link to={`/`}>Sign In</Link>
              </div>
            </Form>
          </div>
        </div>
      </main>
    );
  }
}

export default Register;
