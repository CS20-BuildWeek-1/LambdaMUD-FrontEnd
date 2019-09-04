import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Col, Form, FormGroup } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { setLocale } from "yup";
import Swal from "sweetalert2";
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

  submitValues = ({ username, email, password, changepassword }) => {
    console.log({ username, email, password, changepassword });
    this.setState({
      username: username,
      email: email,
      password1: password,
      password2: changepassword
    });
    const herokurl = "https://lambdamud007.herokuapp.com";
    console.log("this state", this.state);

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
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Something went wrong!",
          // confirmButtonText: "okay",
          footer:
            '<h3>Help:</h3><p>Sign in with <span>"testusername"</span> and <span>"testpassword"</span> if experiencing trouble</p>'
        });
      });
  };

  render() {
    setLocale({
      string: {
        min: "Password must be 8 characters"
      }
    });

    const Schema = Yup.object().shape({
      password1: Yup.string().min(8),
      password2: Yup.string().when("password1", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password1")], "Passwords must match")
      })
    });
    return (
      <main>
        <div id="container">
          <div className="form-contain">
            <Formik
              initialValues={{
                username: "",
                email: "",
                password1: "",
                password2: ""
              }}
              validationSchema={Schema}
              onSubmit={this.submitValues}
            >
              {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
                return (
                  <Form className="p-4" onSubmit={handleSubmit}>
                    <Col>
                      <FormGroup>
                        <div className="form-subject">Register</div>
                        <input
                          className="input"
                          type="email"
                          name="email"
                          id="exampleEmail"
                          placeholder="&#128220; Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          required
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
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.username}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <input
                          aria-describedby="passwordHelpBlock"
                          className="input"
                          type="password"
                          name="password1"
                          id="examplePassword1"
                          placeholder="&#128273; Password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password1}
                          required
                        />

                        <small id="passwordHelpBlock" className="form-text">
                          {errors.password1}
                        </small>
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
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password2}
                          required
                        />
                        <small id="passwordHelpBlock" className="form-text">
                          {errors.password2}
                        </small>
                      </FormGroup>
                    </Col>
                    <button className="btn-success" type="submit">
                      {this.state.loading ? (
                        <span
                          class="spinner-grow spinner-grow-md"
                          style={{
                            position: "absolute",
                            right: "47px"
                          }}
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        ""
                      )}
                      Create Account
                    </button>
                    <div className="alt-link">
                      Already registered? <Link to={`/`}>Sign In</Link>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </main>
    );
  }
}

export default Register;
