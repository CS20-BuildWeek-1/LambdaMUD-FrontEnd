import React from "react";
import axios from "axios";
// import HeadShake from "react-reveal/HeadShake";
import HeadShake from "react-reveal/HeadShake";
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText
} from "reactstrap";
import "./Adventure.css";

// import { Link } from 'react-router-dom';

class Adventure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      playerName: "",
      roomTitle: "",
      roomDescription: "",
      roomPlayers: "",
      roomImage: "",
      direction: "",
      errorMsg: ""
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    // const local = "http://localhost:3000";
    const herokurl = "https://lambda-mud-test.herokuapp.com";
    const key = localStorage.getItem("token");

    axios({
      url: `${herokurl}/api/adv/init`,
      method: "GET",
      headers: {
        Authorization: `${key}`
      }
    })
      .then(res => {
        this.setState({
          playerName: res.data.name,
          roomTitle: res.data.title,
          roomDescription: res.data.description,
          roomPlayers: res.data.players,
          token: key
        });
        {
          if (res.data.title === "Grand Overlook") {
            const imageURL = "../images/overlook.png";
            this.setState({
              roomImage: imageURL
            });
          }
          if (res.data.title === "Foyer") {
            const imageURL = "../images/foyer.png";
            this.setState({
              roomImage: imageURL
            });
          }

          if (res.data.title === "Outside Cave Entrance") {
            const imageURL = "../images/entrance.png";
            this.setState({
              roomImage: imageURL
            });
          }
          if (res.data.title === "Narrow Passage") {
            const imageURL = "../images/passage.png";
            this.setState({
              roomImage: imageURL
            });
          }
          if (res.data.title === "Treasure Chamber") {
            const imageURL = "../images/treasure.png";
            this.setState({
              roomImage: imageURL
            });
          }
        }

        console.log("INIT STATE", this.state);
      })

      .catch(err => {
        console.log("Axios error:", err.response);
      });
  };

  handleMove = direction => {
    const herokurl = "https://lambda-mud-test.herokuapp.com";
    axios({
      url: `${herokurl}/api/adv/move/`,
      method: "POST",
      headers: {
        Authorization: `${this.state.token}`
      },
      data: {
        direction: direction
      }
    })
      .then(res => {
        console.log("MOVE RESPONSE", res.data);

        this.setState({
          roomTitle: res.data.title,
          roomDescription: res.data.description,
          roomPlayers: res.data.players,
          errorMsg: res.data.error_msg
        });
        {
          if (res.data.title === "Grand Overlook") {
            const imageURL = "../images/overlook.png";
            this.setState({
              roomImage: imageURL
            });
          }
          if (res.data.title === "Foyer") {
            const imageURL = "../images/foyer.png";
            this.setState({
              roomImage: imageURL
            });
          }

          if (res.data.title === "Outside Cave Entrance") {
            const imageURL = "../images/entrance.png";
            this.setState({
              roomImage: imageURL
            });
          }
          if (res.data.title === "Narrow Passage") {
            const imageURL = "../images/passage.png";
            this.setState({
              roomImage: imageURL
            });
          }
          if (res.data.title === "Treasure Chamber") {
            const imageURL = "../images/treasure.png";
            this.setState({
              roomImage: imageURL
            });
          }
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    console.log("Room players: ", this.state.roomPlayers);
    return (
      <>
        <div className="main-container">
          <div className="top-container">
            <img
              className="room-img"
              src={this.state.roomImage}
              alt="room image"
            ></img>
            <div className="map">MAP WILL GO HERE</div>
          </div>

          <div className="bottom-container">
            <ul>
              <li>
                <h2>{this.state.roomTitle}</h2>
              </li>
              <li>{this.state.roomDescription}</li>
              <li>
                <b>You:</b> {this.state.playerName}
              </li>
              <li>
                <b>Players:</b>
                <br></br>
                {this.state.roomPlayers[0]}
                <br></br>
                {this.state.roomPlayers[1]}
              </li>

              {this.state.errorMsg ? (
                <div className="alert">
                  <HeadShake>
                    <div
                      className="alert alert-danger"
                      role="alert"
                      style={{
                        width: "300px",
                        margin: "0 auto"
                      }}
                    >
                      You fall into the abyss
                    </div>
                  </HeadShake>
                </div>
              ) : (
                ""
              )}
            </ul>
            <div className="controller">
              <Col>
                <Button
                  id="one"
                  className="btn-dir"
                  onClick={() => this.handleMove("n")}
                >
                  &#x25b2;
                </Button>
              </Col>
              <Col>
                <Button
                  id="four"
                  className="btn-dir"
                  onClick={() => this.handleMove("w")}
                >
                  &#x25c0;
                </Button>
                <Button
                  id="three"
                  className="btn-dir"
                  onClick={() => this.handleMove("e")}
                >
                  &#x25b6;
                </Button>
              </Col>
              <Col>
                <Button
                  id="two"
                  className="btn-dir"
                  onClick={() => this.handleMove("s")}
                >
                  &#x25bc;
                </Button>
              </Col>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Adventure;
