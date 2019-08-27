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
      roomPlayers: ""
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const token = localStorage.getItem("token");
    // const local = "http://localhost:3000";
    const herokurl = "https://lambda-mud-test.herokuapp.com";

    axios({
      url: `${herokurl}/api/adv/init`,
      method: "GET",
      headers: {
        Authorization: `${token}`
      }
    })
      .then(res => {
        this.setState({
          playerName: res.data.name,
          roomTitle: res.data.title,
          roomDescription: res.data.description,
          roomPlayers: res.data.players
        });
      })
      .catch(err => {
        console.log("Axios error:", err.response);
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
      </>
    );
  }
}

export default Adventure;
