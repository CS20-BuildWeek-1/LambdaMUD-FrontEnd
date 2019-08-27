import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText
} from "reactstrap";

class Login extends Component {
  state = {
    username: "",
    password: "",
    status: 0
  };

  inputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();
    axios
      .post("https://lambda-mud-test.herokuapp.com/api/login", this.state)
      .then(res => {
        console.log("response", res);
        const token = res.data["key"];
        localStorage.setItem("token", `Token ${token}`);
        this.props.history.push("/adventure");
      })
      .catch(err => {
        const error = JSON.stringify(err);
        if (error.includes("401")) {
          this.setState({ status: 401 });
        }
      });
  };

  render() {
    return (
      <>
        <main>
          <div id="container">
            <div className="link-buttons">
              <Link to={`/`}>Login</Link>
              <Link to={`/register`}>Register</Link>
            </div>
            <div className="form-contain">
              <Form className="p-4" onSubmit={this.submitHandler}>
                <Col>
                  <FormGroup>
                    <div className="form-subject">Login</div>
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
                <button className="btn-success" type="submit">
                  Join World
                </button>
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
