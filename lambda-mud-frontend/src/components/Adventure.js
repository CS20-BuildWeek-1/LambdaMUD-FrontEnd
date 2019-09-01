import React from "react";
import axios from "axios";
import HeadShake from "react-reveal/HeadShake";
import Fade from "react-reveal/Fade";
import Entrance from "../images/entrance4.gif";
import Foyer from "../images/foyer.gif";
import Overlook from "../images/overlook.gif";
import Treasure from "../images/treasure.gif";
import Lava from "../images/lava.gif";
import Bridge from "../images/bridge.gif";
import Passage from "../images/cave.gif";
import Lambda from "../images/lambdalogo.png";
import TV from "../images/tubetv2.png";
import Sound from "react-sound";
import EntranceSong from "../sounds/Entrance.mp3";
import FoyerSong from "../sounds/Foyer.mp3";
import PassageSong from "../sounds/Passage.mp3";
import OverlookSong from "../sounds/overlook.mp3";
import TreasureSong from "../sounds/Treasure.mp3";
import LavaSong from "../sounds/Lava.mp3";
import BridgeSong from "../sounds/Bridge.mp3";
import GameOver from "../sounds/gameover.mp3";
import ClickSound from "../sounds/click.mp3";
import PauseStart from "../sounds/pausestart.wav";
import PauseEnd from "../sounds/paseend.wav";
import MoveSound from "../sounds/move.wav";
import Delay from "react-delay";

import mud from "../images/mud.png";
// import swal from "@sweetalert/with-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// import NavBar from "./Navbar";
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
      errorMsg: "",
      movePlayer: false
    };
  }

  componentDidMount() {
    this.init();
  }

  pauseGame = () => {
    this.clickFx();
    this.pauseStartFx();
    const Swert = withReactContent(Swal);

    Swert.fire({
      title: <div className="pause-title">Game Paused</div>,
      type: "info",
      // html: <div className="pause">Pause</div>,
      // background: "marron",
      confirmButtonText: <div className="pause-resume">Continue</div>,
      backdrop: "rgba(255, 255, 255, 0.7)"
    });

    document
      .querySelector(".swal2-container")
      .addEventListener("click", function() {
        const pause = document.getElementById("pauseend");
        console.log("pauseend", pause);
        pause.volume = 0.05;
        pause.play();
      });
  };

  logout = () => {
    this.clickFx();
    const Swert = withReactContent(Swal);

    Swert.fire({
      animation: false,
      customClass: "animated fadeInUpBig",
      showConfirmButton: false,
      html: (
        <>
          <Sound
            url={GameOver}
            playStatus={Sound.status.PLAYING}
            // playFromPosition={300 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            volume={10}
          />
          <div className="custom">
            <div className="swal-container">
              <div className="swal-top"></div>
              <div className="swal-bottom">
                <img className="swal-mud" src={mud} alt="mudd" />
              </div>
              <div className="swal-header">
                <h2>
                  <span style={{ color: "black" }}>&#9167; </span>
                  {"   "}GAME EJECTED{"   "}
                  <span style={{ color: "black" }}> &#9167;</span>
                </h2>
              </div>
            </div>
          </div>
        </>
      )
    });
    setTimeout(() => {
      localStorage.removeItem("token");
      window.location.assign("/");
    }, 3000);
  };

  init = () => {
    // const local = "http://localhost:3000";
    const testurl = "https://lambda-mud-test.herokuapp.com";
    const herokurl = "https://lambdamud007.herokuapp.com";
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
            const imageURL = Overlook;
            this.setState({
              roomImage: imageURL
            });
          }
          if (res.data.title === "Foyer") {
            const imageURL = Foyer;
            this.setState({
              roomImage: imageURL
            });
          }

          if (res.data.title === "Outside Cave Entrance") {
            const imageURL = Entrance;
            this.setState({
              roomImage: imageURL
            });
          }
          if (res.data.title === "Narrow Passage") {
            const imageURL = Passage;
            this.setState({
              roomImage: imageURL
            });
          }
          if (res.data.title === "Treasure Chamber") {
            const imageURL = Treasure;
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
    const herokurl = "https://lambdamud007.herokuapp.com";
    const testurl = "https://lambda-mud-test.herokuapp.com";
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
          errorMsg: res.data.error_msg,
          movePlayer: true
        });

        {
          if (res.data.title === "Grand Overlook") {
            const imageURL = Overlook;
            this.setState({
              roomImage: imageURL
            });
            this.moveFx();
          }
          if (res.data.title === "Foyer") {
            const imageURL = Foyer;
            this.setState({
              roomImage: imageURL
            });
            this.moveFx();
          }

          if (res.data.title === "Outside Cave Entrance") {
            const imageURL = Entrance;
            this.setState({
              roomImage: imageURL
            });
            this.moveFx();
          }
          if (res.data.title === "Narrow Passage") {
            const imageURL = Passage;
            this.setState({
              roomImage: imageURL
            });
            this.moveFx();
          }
          if (res.data.title === "Treasure Chamber") {
            const imageURL = Treasure;
            this.setState({
              roomImage: imageURL
            });
            this.moveFx();
          }
          if (res.data.title === "Shaky Bridge") {
            const imageURL = Bridge;
            this.setState({
              roomImage: imageURL
            });
            this.moveFx();
          }
          if (res.data.title === "Lava Pit") {
            const imageURL = Lava;
            this.setState({
              roomImage: imageURL
            });
            this.moveFx();
          }
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  renderSong() {
    // if (this.state.movePlayer) {
    if (this.state.roomTitle === "Foyer") {
      return (
        // this.moveFx(),
        <>
          <Delay wait={1000}>
            <Sound
              url={FoyerSong}
              playStatus={Sound.status.PLAYING}
              // playFromPosition={300 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              loop={true}
              volume={5}
            />
          </Delay>
        </>
      );
    } else if (this.state.roomTitle === "Grand Overlook") {
      return (
        // this.moveFx(),
        <>
          <Delay wait={1000}>
            <Sound
              url={OverlookSong}
              playStatus={Sound.status.PLAYING}
              // playFromPosition={300 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              loop={true}
              volume={7}
            />
          </Delay>
        </>
      );
    } else if (this.state.roomTitle === "Narrow Passage") {
      return (
        // this.moveFx(),
        <>
          <Delay wait={1000}>
            <Sound
              url={PassageSong}
              playStatus={Sound.status.PLAYING}
              playFromPosition={200 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              loop={true}
              volume={10}
            />
          </Delay>
        </>
      );
    } else if (this.state.roomTitle === "Treasure Chamber") {
      return (
        // this.moveFx(),
        <>
          <Delay wait={1000}>
            <Sound
              url={TreasureSong}
              playStatus={Sound.status.PLAYING}
              // playFromPosition={300 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              volume={10}
            />
          </Delay>
        </>
      );
    } else if (this.state.roomTitle === "Outside Cave Entrance") {
      return (
        // this.moveFx(),
        <>
          <Delay wait={1000}>
            <Sound
              url={EntranceSong}
              playStatus={Sound.status.PLAYING}
              // playFromPosition={300 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              loop={true}
              volume={5}
            />
          </Delay>
        </>
      );
    } else if (this.state.roomTitle === "Shaky Bridge") {
      return (
        // this.moveFx(),
        <>
          <Delay wait={1000}>
            <Sound
              url={BridgeSong}
              playStatus={Sound.status.PLAYING}
              // playFromPosition={300 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              loop={true}
              volume={8}
            />
          </Delay>
        </>
      );
    } else if (this.state.roomTitle === "Lava Pit") {
      return (
        // this.moveFx(),
        <>
          <Delay wait={1000}>
            <Sound
              url={LavaSong}
              playStatus={Sound.status.PLAYING}
              // playFromPosition={300 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              loop={true}
              volume={6}
            />
          </Delay>
        </>
      );
    } else {
      return null;
    }
    // }
  }

  renderPlayer() {
    const pixelPlayer5 = (
      <div className=" animated fadeIn">
        <img
          alt="mapplayer"
          className="map-player5"
          src="https://media.giphy.com/media/1k0ApwEji3hAimrNas/giphy.gif"
          width="70"
          height="80"
        />
      </div>
    );
    const pixelPlayer4 = (
      <div className=" animated fadeIn">
        <img
          alt="mapplayer"
          className="map-player4"
          src="https://media.giphy.com/media/1k0ApwEji3hAimrNas/giphy.gif"
          width="70"
          height="80"
        />
      </div>
    );
    const pixelPlayer3 = (
      <div className=" animated fadeIn">
        <img
          alt="mapplayer"
          className="map-player3"
          src="https://media.giphy.com/media/1k0ApwEji3hAimrNas/giphy.gif"
          width="70"
          height="80"
        />
      </div>
    );
    const pixelPlayer2 = (
      <div className=" animated fadeIn">
        <img
          alt="mapplayer"
          className="map-player2"
          src="https://media.giphy.com/media/2wWuIJQISOKzM3uZ5r/giphy.gif"
          width="70"
          height="80"
        />
      </div>
    );
    const pixelPlayer1 = (
      <div className=" animated fadeIn">
        <img
          alt="mapplayer"
          className="map-player1"
          src="https://media.giphy.com/media/B2kmdIkG7tr54VD3Im/giphy.gif"
          width="70"
          height="80"
        />
      </div>
    );
    const pixelPlayer6 = (
      <div className=" animated fadeIn">
        <img
          alt="mapplayer"
          className="map-player6"
          src="https://media.giphy.com/media/1k0ApwEji3hAimrNas/giphy.gif"
          width="70"
          height="80"
        />
      </div>
    );
    const pixelPlayer7 = (
      <div className=" animated fadeIn">
        <img
          alt="mapplayer"
          className="map-player7"
          src="https://media.giphy.com/media/8YQZdzXP1k3A4fuvvX/giphy.gif"
          width="70"
          height="80"
        />
      </div>
    );

    if (this.state.roomTitle === "Foyer") {
      return pixelPlayer5;
    } else if (this.state.roomTitle === "Grand Overlook") {
      return pixelPlayer4;
    } else if (this.state.roomTitle === "Narrow Passage") {
      return pixelPlayer3;
    } else if (this.state.roomTitle === "Treasure Chamber") {
      return pixelPlayer2;
    } else if (this.state.roomTitle === "Outside Cave Entrance") {
      return pixelPlayer1;
    } else if (this.state.roomTitle === "Shaky Bridge") {
      return pixelPlayer6;
    } else if (this.state.roomTitle === "Lava Pit") {
      return pixelPlayer7;
    } else {
      return null;
    }
  }

  clickFx = () => {
    const click = document.getElementById("click");
    click.playbackRate = 4;
    click.volume = 0.3;
    click.play();
  };

  moveFx = () => {
    const move = document.getElementById("move");
    // move.playbackRate = 4;
    move.volume = 0.03;
    move.play();
  };

  pauseStartFx = () => {
    const pause = document.getElementById("pause");
    // pause.playbackRate = 4;
    pause.volume = 0.05;
    pause.play();
  };

  pauseEndFx = () => {
    const pause = document.getElementById("pauseend");
    console.log("pauseend", pause);
    pause.volume = 0.05;
    pause.play();
  };

  render() {
    console.log("Room players: ", this.state.roomPlayers);
    console.log("this State: ", this.state);
    console.log("ROOM TITLE: ", this.state.roomTitle);

    return (
      <>
        {/* <NavBar /> */}
        {this.renderSong()}

        <div className="main-container">
          <div className="top-container">
            <div className="map-container">
              <div className="map">
                <div>{this.renderPlayer()}</div>
              </div>
            </div>
            <div className="tv-container">
              <img className="tv-img" alt="tv" src={TV} />

              <img
                className="room-img"
                alt="room"
                src={this.state.roomImage}
              ></img>
            </div>
          </div>

          <div className="bottom-container">
            <div className="left-container">
              <div className="player-container">
                <div className="player-text">
                  <h2>Current Player</h2>
                  <div className="current-player">
                    <Fade left>
                      <img
                        alt="mapplayer"
                        src="https://media.giphy.com/media/2ywLocM9VYvpPa5d1Y/giphy.gif"
                        width="40"
                        height="40"
                      ></img>
                    </Fade>

                    <h5
                      style={{
                        fontFamily: "Dragon",
                        color: "Maroon"
                      }}
                    >
                      {this.state.playerName}
                    </h5>
                  </div>
                  <h5 style={{ paddingTop: "10px" }}>Nearby Players</h5>

                  <div
                    className="nearby-players"
                    style={{
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      color: "steelblue"
                    }}
                  >
                    {`
               ${this.state.roomPlayers[0] ? this.state.roomPlayers[0] : ""} 
               ${this.state.roomPlayers[1] ? this.state.roomPlayers[1] : ""} 
               ${this.state.roomPlayers[2] ? this.state.roomPlayers[2] : ""}  
               ${this.state.roomPlayers[3] ? this.state.roomPlayers[3] : ""} 
               ${this.state.roomPlayers[4] ? this.state.roomPlayers[4] : ""}
               ${this.state.roomPlayers[5] ? this.state.roomPlayers[5] : ""}
               ${this.state.roomPlayers[6] ? this.state.roomPlayers[6] : ""}
               `}
                  </div>
                </div>
              </div>

              <div className="room-container">
                <h2>{this.state.roomTitle}</h2>

                {this.state.roomDescription}
                {this.state.errorMsg ? (
                  // <div className="alert">
                  <HeadShake>
                    <div
                      className="alert alert-danger"
                      role="alert"
                      style={{
                        // width: "50%",
                        margin: "10px 10px 0 10px"
                        // margin: "0 auto"
                      }}
                    >
                      You cannot go this direction!
                    </div>
                  </HeadShake>
                ) : (
                  // </div>
                  ""
                )}
              </div>
            </div>

            <div className="right-container">
              <div className="cable"></div>
              <div className="controller">
                <audio id="click">
                  <source src={ClickSound} />
                </audio>
                <audio id="pause">
                  <source src={PauseStart} />
                </audio>
                <audio id="pauseend">
                  <source src={PauseEnd} />
                </audio>
                <audio id="move">
                  <source src={MoveSound} />
                </audio>
                <div className="base">
                  <div className="control-logo">
                    <img className="logo-img" src={Lambda} alt="lambda"></img>
                  </div>
                  <div className="front">
                    <div className="decoration">
                      <div className="stickers">
                        <div className="st-a">A</div>
                        <div className="st-b">B</div>
                        <div className="st-select">QUIT</div>
                        <div className="st-start">PAUSE</div>
                      </div>
                      <div className="decoration-central">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <div className="cross">
                      <div className="circle"></div>

                      <div className="horizontal" onClick={this.clickFx}>
                        <div
                          className="arrowlf"
                          style={{ cursor: "pointer" }}
                          onClick={() => this.handleMove("e")}
                        ></div>
                        <div
                          className="arrowrh"
                          style={{ cursor: "pointer" }}
                          onClick={() => this.handleMove("w")}
                        ></div>
                      </div>

                      <div className="vertical" onClick={this.clickFx}>
                        <div
                          className="arrowlf"
                          style={{ cursor: "pointer" }}
                          onClick={() => this.handleMove("s")}
                        ></div>
                        <div
                          className="arrowrh"
                          style={{ cursor: "pointer" }}
                          onClick={() => this.handleMove("n")}
                        ></div>
                      </div>

                      <div className="back-cross">
                        <div className="horiz"></div>
                        <div className="vert"></div>
                      </div>
                    </div>
                    <div className="buttons-a-b">
                      <div className="btn-border">
                        <div
                          className="btn-round a"
                          onClick={this.clickFx}
                        ></div>
                      </div>
                      <div className="btn-border">
                        <div
                          className="btn-round b"
                          onClick={this.clickFx}
                        ></div>
                      </div>
                    </div>
                    <div className="buttons-select">
                      <div
                        className="btn-central quit"
                        onClick={this.logout}
                      ></div>
                      <div
                        className="btn-central pause"
                        onClick={this.pauseGame}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Adventure;
