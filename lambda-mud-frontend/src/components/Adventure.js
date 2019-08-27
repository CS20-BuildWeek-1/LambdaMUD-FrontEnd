import React from "react";
import axios from "axios";
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
      direction: ""
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
          roomPlayers: res.data.players
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <ul>
          <li>{this.state.roomTitle}</li>
          <li>{this.state.roomDescription}</li>
          <li>{this.state.playerName}</li>
          <li>{this.state.roomPlayers}</li>
        </ul>
        <button className="btn-dir" onClick={() => this.handleMove("n")}>
          North
        </button>
        <button className="btn-dir" onClick={() => this.handleMove("s")}>
          South
        </button>
        <button className="btn-dir" onClick={() => this.handleMove("e")}>
          East
        </button>
        <button className="btn-dir" onClick={() => this.handleMove("w")}>
          West
        </button>
      </>
    );
  }
}

export default Adventure;
