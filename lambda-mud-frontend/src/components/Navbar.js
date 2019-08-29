import React from "react";
import { NavLink as RouteLink } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navigation extends React.Component {
  render() {
    const isLogged = window.localStorage.getItem("key");
    return (
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/">
          <div className="logo-container">
            <img className="logo" src="" alt="logo" />
          </div>
        </NavbarBrand>
        <div className="profile">
          {isLogged ? (
            <RouteLink to={`/user/${this.props.auth_id}`}>
              <FontAwesomeIcon icon={faUser} />
            </RouteLink>
          ) : (
            <a href={`${process.env.REACT_APP_BE_URL}/auth/google`}>
              <FontAwesomeIcon icon={faUser} />
            </a>
          )}
        </div>
      </Navbar>
    );
  }
}

export default Navigation;
