import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Col, Form, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import newLogo from "../images/muddtext.png";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    status: 0,
    loading: false
  };

  inputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    // const testurl = "https://lambda-mud-test.herokuapp.com";
    const herokurl = "https://lambdamud007.herokuapp.com";
    // const local = "http://127.0.0.1:8000";
    e.preventDefault();
    this.setState({ loading: true });

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
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log("Axios error:", err.response);
        this.setState({ loading: false });
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Username and/or password incorrect!",
          confirmButtonText: "Try Again",
          footer:
            '<h3>Help:</h3><p>Sign in with <span>"testusername"</span> and <span>"testpassword"</span> if experiencing trouble</p>'
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
          <div className="rpgui-content rpgui-cursor-default">
            <div id="container">
              <div className="form-contain">
                <Form className="p-4" onSubmit={this.submitHandler}>
                  <div className="rpgui-content">
                    <h1
                      style={{
                        fontFamily: "RS9",
                        fontSize: "50px",
                        color: "black",
                        textShadow: "none"

                        // fontWeight: 500
                      }}
                    >
                      Lambda Mudd
                    </h1>
                  </div>

                  <Col>
                    <FormGroup>
                      <input
                        style={{
                          background: "none",
                          textShadow: "none",
                          padding: "0px",
                          minHeight: "none",
                          fontSize: "16px",
                          color: "black"
                        }}
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
                        style={{
                          background: "none",
                          textShadow: "none",
                          padding: "0px",
                          minHeight: "none",
                          fontSize: "16px",
                          color: "black"
                        }}
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
                  <div className="rpgui-content">
                    <button
                      className="rpgui-button down"
                      type="submit"
                      style={{
                        margin: "0 auto",
                        fontFamily: "RS9",
                        fontSize: "25px",
                        height: "45px",
                        color: "white",
                        textShadow:
                          "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black"
                      }}
                    >
                      {this.state.loading ? (
                        <span
                          className="spinner-grow spinner-grow-md"
                          style={{
                            position: "absolute",
                            right: "55px"
                          }}
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        ""
                      )}
                      Sign In
                    </button>
                  </div>
                  <div className="alt-link">
                    Not registered?
                    <Link to={`/register`}> Create an account</Link>
                  </div>
                </Form>
              </div>
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
