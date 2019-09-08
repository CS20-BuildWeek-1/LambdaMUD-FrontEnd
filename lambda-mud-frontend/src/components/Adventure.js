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
import Nintendo from "../images/nintendo.gif";
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
import StartSound from "../sounds/nintendo.wav";
import PauseStart from "../sounds/pausestart.wav";
import PauseEnd from "../sounds/paseend.wav";
import MoveSound from "../sounds/move.wav";
import ErrorSound from "../sounds/error.wav";
import EjectSound from "../sounds/eject.mp3";
import Delay from "react-delay";
import mud from "../images/mud.png";
// import swal from "@sweetalert/with-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Form from "./Form";
import TextOutput from "./TextOutput";
import { Card, CardMedia, CardTitle } from "material-ui/Card";
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
  blue500
} from "material-ui/styles/colors";
import Divider from "material-ui/Divider";

import Pusher from "pusher-js";
// import ChatList from "./ChatList";
// import ChatBox from "./ChatBox";
// hi
// import logo from "./logo.svg";

// import NavBar from "./Navbar";
import "./Adventure.css";

// import { Link } from 'react-router-dom';

const colors = [
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
  blue500
];

const styles = {
  card: {
    // width: '60%',
    // margin: '50px auto 50px',
    backgroundColor: "rgba(255, 255, 255, 0.6)"
  }
};

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
      loading: false,
      movePlayer: false,
      message: "",
      text: "",
      value: "",
      username: "",
      chats: [],
      broadcast: "",
      uuid: ""
    };
  }

  componentDidMount() {
    this.init();
    this.startFx();
  }

  say = () => {
    this.setState({ text: "" });
    // const local = "http://127.0.0.1:8000";
    // const testurl = "https://lambda-mud-test.herokuapp.com";
    const herokurl = "https://lambdamud007.herokuapp.com";
    const key = localStorage.getItem("token");

    console.log("text", this.state.text);

    axios({
      url: `${herokurl}/api/adv/say/`,
      method: "POST",
      headers: {
        Authorization: `${key}`
      },
      data: {
        message: `${this.state.text}`
        // messageName: res.data.name
      }
    })
      .then(res => {
        console.log("say response:", res.data);
      })

      .catch(err => {
        console.log("Axios error:", err.response);
      });
  };

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

        pause.volume = 0.05;
        pause.play();
      });
  };

  logout = () => {
    this.clickFx();
    this.ejectFx();
    const Swert = withReactContent(Swal);

    Swert.fire({
      animation: false,
      customClass: "animated fadeInUpBig",
      showConfirmButton: false,
      html: (
        <>
          <Delay wait={1000}>
            <Sound
              url={GameOver}
              playStatus={Sound.status.PLAYING}
              // playFromPosition={300 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              volume={10}
            />
          </Delay>
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
    // const local = "http://127.0.0.1:8000";
    // const testurl = "https://lambda-mud-test.herokuapp.com";
    const herokurl = "https://lambdamud007.herokuapp.com";
    const key = localStorage.getItem("token");

    axios({
      url: `${herokurl}/api/adv/init/`,
      method: "GET",
      headers: {
        Authorization: `${key}`
      }
    })
      .then(res => {
        console.log("init data", res.data);
        this.setState({
          playerName: res.data.name,
          roomTitle: res.data.title,
          roomDescription: res.data.description,
          roomPlayers: res.data.players,
          uuid: res.data.uuid,
          token: key
        });

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
      })

      .catch(err => {
        console.log("Axios error:", err.response);
      })
      .then(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher("ff2810ec3a66168f055f", {
          cluster: "us3",
          // forceTLS: true
          encrypted: true
        });
        console.log("uuid:", this.state.uuid);
        const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
        channel.bind("broadcast", data => {
          console.log("data:", data);
          this.setState({ broadcast: data.message });
        });
        // channel.bind("pusher:subscription_succeeded", this.retrieveHistory);
      });
  };

  // retrieveHistory = () => {
  //   const local = "http://127.0.0.1:8000";
  //   axios({
  //     url: `${local}/api/adv/messages/`,
  //     method: "GET"
  //     // headers: {
  //     //   Authorization: `${this.state.token}`
  //     // },
  //     // data: {
  //     //   direction: direction
  //   })
  //     .then(res => {
  //       console.log("retreive response:", res.data);
  //     })

  //     .catch(err => {
  //       console.log("Axios error:", err.response);
  //     });
  // };

  handleMove = direction => {
    this.clickFx();
    this.animateCSS(".map-player", "flash");
    const herokurl = "https://lambdamud007.herokuapp.com";
    // const testurl = "https://lambda-mud-test.herokuapp.com";
    // const local = "http://127.0.0.1:8000";
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
        this.setState({
          roomTitle: res.data.title,
          roomDescription: res.data.description,
          roomPlayers: res.data.players,
          errorMsg: res.data.error_msg,
          movePlayer: true,
          broadcast: ""
        });

        if (res.data.title === "Grand Overlook" && !res.data.error_msg) {
          const imageURL = Overlook;
          this.setState({
            roomImage: imageURL
          });

          this.moveFx();
        } else if (res.data.title === "Foyer" && !res.data.error_msg) {
          const imageURL = Foyer;
          this.setState({
            roomImage: imageURL
          });
          this.moveFx();
        } else if (
          res.data.title === "Outside Cave Entrance" &&
          !res.data.error_msg
        ) {
          const imageURL = Entrance;
          this.setState({
            roomImage: imageURL
          });
          this.moveFx();
        } else if (res.data.title === "Narrow Passage" && !res.data.error_msg) {
          const imageURL = Passage;
          this.setState({
            roomImage: imageURL
          });
          this.moveFx();
        } else if (
          res.data.title === "Treasure Chamber" &&
          !res.data.error_msg
        ) {
          const imageURL = Treasure;
          this.setState({
            roomImage: imageURL
          });
          this.moveFx();
        } else if (res.data.title === "Shaky Bridge" && !res.data.error_msg) {
          const imageURL = Bridge;
          this.setState({
            roomImage: imageURL
          });
          this.moveFx();
        } else if (res.data.title === "Lava Pit" && !res.data.error_msg) {
          const imageURL = Lava;
          this.setState({
            roomImage: imageURL
          });
          this.moveFx();
        } else if (res.data.err_msg) {
          return this.animateCSS(".map-player", "bounce");
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

  animateCSS(element, animationName, callback) {
    const node = document.querySelector(".map-player");
    node.classList.add("animated", animationName);

    function handleAnimationEnd() {
      node.classList.remove("animated", animationName);
      node.removeEventListener("animationend", handleAnimationEnd);

      if (typeof callback === "function") callback();
    }

    node.addEventListener("animationend", handleAnimationEnd);
  }

  clickFx = () => {
    const click = document.getElementById("click");
    click.playbackRate = 4;
    click.volume = 0.4;
    click.play();
  };

  moveFx = () => {
    const move = document.getElementById("move");
    // move.playbackRate = 4;
    move.volume = 0.03;
    move.play();
  };

  ejectFx = () => {
    const eject = document.getElementById("eject");
    eject.volume = 0.4;
    eject.play();
  };

  startFx = () => {
    const start = document.getElementById("start");
    // move.playbackRate = 4;
    start.volume = 0.07;
    start.play();
  };

  errorFx = () => {
    const error = document.getElementById("error");
    // move.playbackRate = 4;
    error.volume = 0.02;
    error.play();
  };

  pauseStartFx = () => {
    const pause = document.getElementById("pause");
    // pause.playbackRate = 4;
    pause.volume = 0.05;
    pause.play();
  };

  pauseEndFx = () => {
    const pause = document.getElementById("pauseend");

    pause.volume = 0.05;
    pause.play();
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const room = this.state.roomTitle;

    return (
      <Fade>
        <>
          {/* <NavBar /> */}
          {this.renderSong()}
          {this.state.errorMsg ? this.errorFx() : ""}

          <div className="main-container">
            <div className="top-container">
              <div className="map-container">
                <div className="map">
                  <div className="overlook">
                    {room === "Grand Overlook" ? (
                      <img
                        id="map-player1"
                        className="map-player"
                        alt="map-player"
                        src="https://media.giphy.com/media/1k0ApwEji3hAimrNas/giphy.gif"
                        width="70"
                        height="80"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="treasure">
                    {room === "Treasure Chamber" ? (
                      <img
                        id="map-player2"
                        className="map-player"
                        alt="map-player"
                        src="https://media.giphy.com/media/2wWuIJQISOKzM3uZ5r/giphy.gif"
                        width="70"
                        height="80"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="lava">
                    {room === "Lava Pit" ? (
                      <img
                        id="map-player3"
                        className="map-player"
                        alt="map-player"
                        src="https://media.giphy.com/media/8YQZdzXP1k3A4fuvvX/giphy.gif"
                        width="70"
                        height="80"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="foyer">
                    {room === "Foyer" ? (
                      <img
                        id="map-player4"
                        className="map-player"
                        alt="map-player"
                        src="https://media.giphy.com/media/1k0ApwEji3hAimrNas/giphy.gif"
                        width="70"
                        height="80"
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="passage">
                    {room === "Narrow Passage" ? (
                      <img
                        id="map-player5"
                        className="map-player"
                        alt="map-player"
                        src="https://media.giphy.com/media/1k0ApwEji3hAimrNas/giphy.gif"
                        width="70"
                        height="80"
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="bridge">
                    {room === "Shaky Bridge" ? (
                      <img
                        id="map-player6"
                        className="map-player"
                        alt="map-player"
                        src="https://media.giphy.com/media/1k0ApwEji3hAimrNas/giphy.gif"
                        width="70"
                        height="80"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="entrance">
                    {room === "Outside Cave Entrance" ? (
                      <img
                        id="map-player7"
                        className="map-player"
                        alt="map-player"
                        src="https://media.giphy.com/media/B2kmdIkG7tr54VD3Im/giphy.gif"
                        width="70"
                        height="80"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="blank"></div>
                  <Card style={styles.card} className="pusher-chat">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "darkgreen"
                      }}
                    >
                      {this.state.username}

                      <TextOutput
                        // style={styles.text}
                        title={this.state.roomTitle}
                        description={this.state.roomDescription}
                        players={this.state.roomPlayers}
                        broadcast={this.state.broadcast}
                      />
                      <Form
                        // style={styles.input}
                        submitHandler={this.say}
                        handleInputChange={this.handleInputChange}
                        value={this.state.text}
                        // command={this.state.command}
                      />
                    </div>
                  </Card>
                </div>
              </div>
              <div className="tv-container">
                <img className="tv-img" alt="tv" src={TV} />
                <img className="room-img" alt="room" src={Nintendo}></img>
                {/* http://giphygifs.s3.amazonaws.com/media/riw3K0D2h4klG/giphy.gif */}
                <Delay wait={2000}>
                  <Fade>
                    <img
                      className="room-img"
                      alt="room"
                      src={this.state.roomImage}
                    ></img>
                  </Fade>
                </Delay>
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
                    <div className="nearby-players">
                      {`
               ${this.state.roomPlayers[0] ? this.state.roomPlayers[0] : ""} 
               ${this.state.roomPlayers[1] ? this.state.roomPlayers[1] : ""} 
               ${this.state.roomPlayers[2] ? this.state.roomPlayers[2] : ""}  
               ${this.state.roomPlayers[3] ? this.state.roomPlayers[3] : ""} 
               ${this.state.roomPlayers[4] ? this.state.roomPlayers[4] : ""}
               ${this.state.roomPlayers[5] ? this.state.roomPlayers[5] : ""}
            
               `}
                    </div>
                  </div>
                </div>

                <div className="room-container">
                  <div className="player-text">
                    <h4>{this.state.roomTitle}</h4>
                    <p>{this.state.roomDescription}</p>

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
              </div>

              <div className="right-container">
                <div className="cable"></div>
                <div className="controller">
                  <audio id="click">
                    <source src={ClickSound} />
                  </audio>
                  <audio id="start">
                    <source src={StartSound} />
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
                  <audio id="error">
                    <source src={ErrorSound} />
                  </audio>
                  <audio id="eject">
                    <source src={EjectSound} />
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

                        <div className="horizontal">
                          <div
                            className="right"
                            onClick={() => this.handleMove("e")}
                            style={{
                              right: "0px",
                              position: "absolute",
                              width: "30px",
                              height: "100%",
                              top: "0px",
                              zIndex: "2"
                            }}
                          ></div>
                          <div className="arrowlf"></div>
                        </div>

                        <div
                          className="left"
                          onClick={() => this.handleMove("w")}
                          style={{
                            position: "absolute",
                            width: "30px",
                            height: "33px",
                            top: "28px",
                            left: "5px",
                            zIndex: "2"
                          }}
                        >
                          <div className="arrowrh"></div>
                        </div>

                        <div className="vertical">
                          <div
                            className="down"
                            onClick={() => this.handleMove("s")}
                            style={{
                              right: "0px",
                              position: "absolute",
                              width: "30px",
                              height: "100%",
                              top: "0px"
                            }}
                          >
                            <div className="vert-arrowlf"></div>
                          </div>
                          <div
                            className="up"
                            onClick={() => this.handleMove("n")}
                            style={{
                              position: "absolute",
                              width: "30px",
                              height: "100%",
                              top: "0px",
                              left: "50"
                            }}
                          >
                            <div className="vert-arrowrh"></div>
                          </div>
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
      </Fade>
    );
  }
}

export default Adventure;
