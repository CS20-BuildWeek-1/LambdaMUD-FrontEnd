import React from "react";
import axios from "axios";
import HeadShake from "react-reveal/HeadShake";

// import { Link } from 'react-router-dom';
// Feature branch #2

class Adventure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      playerName: "",
      roomTitle: "",
      roomDescription: "",
      roomPlayers: "",
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
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <>
        <ul>
          <li>{this.state.roomTitle}</li>
          <li>{this.state.roomDescription}</li>
          <li class="current-player">Current Player: {this.state.playerName}</li>
          <br></br>
          <li>Top 3 players in this room:</li>
          <li>{this.state.roomPlayers[0]}</li>
          <li>{this.state.roomPlayers[1]}</li>
          <li>{this.state.roomPlayers[2]}</li>
        </ul>

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
