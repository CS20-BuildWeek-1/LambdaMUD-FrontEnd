import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Col, Form, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import "./Register.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    status: 0
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
      url: `${herokurl}/api/login/`,
      method: "POST",
      data: {
        username: `${this.state.username}`,
        password: `${this.state.password}`,
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
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Username and/or password incorrect!",
          confirmButtonText: "Try Again"
          // footer: "<a href>Why do I have this issue?</a>"
        });
      });
  };

  errorResponse = () => {
    return (
      <small id="passwordHelpBlock" className="form-text">
        Username and/or password incorrect
      </small>
    );
  };

  render() {
    return (
      <>
        <main>
          <div id="container">
            <div className="form-contain">
              <Form className="p-4" onSubmit={this.submitHandler}>
                <div className="form-subject">Login</div>

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
                      name="password"
                      id="examplePassword"
                      placeholder="&#128273; Password"
                      value={this.state.password}
                      onChange={this.inputChangeHandler}
                    />
                  </FormGroup>
                </Col>

                <button className="btn-success" type="submit">
                  Join World
                </button>
                <div className="alt-link">
                  Not registered?
                  <Link to={`/register`}> Create an account</Link>
                </div>
              </Form>
            </div>
          </div>
        </main>

        <p
          style={
            this.state.status === 401
              ? { color: "red", textAlign: "center", marginTop: "20px" }
              : { display: "none" }
          }
        >
          Invalid username or password.
        </p>
      </>
    );
  }
}

export default Login;
