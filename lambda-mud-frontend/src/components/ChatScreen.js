import React, { Component } from "react";

import ChatBox from "./ChatBox";
import "./ChatScreen.scss";
import axios from "axios";
import TypingIndicator from "./TypingIndicator";
import MessageOutgoing from "../sounds/msgoutgoing.wav";

import ScrollToBottom from "react-scroll-to-bottom";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      text: "",
      usersWhoAreTyping: []
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  sendMessage(text) {
    this.msgOutgoingFx();
    this.props.currentUser.sendMessage({
      text,
      roomId: "71423e2a-f125-4436-9409-098d5572d4e2"
    });
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        username: this.props.username,
        message: this.props.text
      };
      axios.post("https://cryptic-waters-51084.herokuapp.com/message", payload);
      this.setState({ text: "" });
    } else {
      this.setState({ text: e.target.value });
    }
  }
  msgOutgoingFx = () => {
    const messageOutgoing = document.getElementById("messageOutgoing");
    messageOutgoing.volume = 0.05;
    messageOutgoing.play();
  };

  handleSubmit(e) {
    const payload = {
      username: this.props.username,
      message: this.props.text
    };
    axios
      .post("https://cryptic-waters-51084.herokuapp.com/message", payload)
      .then(res => {
        console.log(res);
      });
    this.setState({ text: "" });
  }

  sendTypingEvent() {
    this.props.currentUser
      .isTypingIn({ roomId: "71423e2a-f125-4436-9409-098d5572d4e2" })
      .catch(error => console.error("error", error));
  }

  getRandColor(brightness) {
    // Six levels of brightness from 0 to 5, 0 being the darkest
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness * 51, brightness * 51, brightness * 51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(
      function(x) {
        return Math.round(x / 2.0);
      }
    );
    return "rgb(" + mixedrgb.join(",") + ")";
  }

  userJoined() {
    if (this.props.userJoined.length > 0) {
      return <p>{this.props.userJoined} joined</p>;
    }
  }

  render() {
    let namesArr = [];

    for (let i = 0; i < this.props.messages.length; i++) {
      let name = this.props.messages[i]["senderId"];
      namesArr.push(name);
    }
    let uniqueNames = [...new Set(namesArr)];

    // console.log("NamesArr", namesArr);
    return (
      <>
        <audio id="messageOutgoing">
          <source src={MessageOutgoing} />
        </audio>

        <ScrollToBottom id="chat-list">
          <ul>
            <div>
              <div className="chatMessage">
                <div className="box">
                  {this.props.messages.map(message => {
                    if (message.senderId === uniqueNames[0]) {
                      return (
                        <p>
                          <span style={{ color: "violet" }}>
                            {message.senderId}:
                          </span>{" "}
                          {message.text}
                        </p>
                      );
                    } else if (message.senderId === uniqueNames[1]) {
                      return (
                        <p>
                          <span style={{ color: "teal" }}>
                            {message.senderId}:
                          </span>{" "}
                          {message.text}
                        </p>
                      );
                    } else if (message.senderId === uniqueNames[2]) {
                      return (
                        <p>
                          <span style={{ color: "chartreuse" }}>
                            {message.senderId}:
                          </span>{" "}
                          {message.text}
                        </p>
                      );
                    } else if (message.senderId === uniqueNames[3]) {
                      return (
                        <p>
                          <span style={{ color: "amber" }}>
                            {message.senderId}:
                          </span>{" "}
                          {message.text}
                        </p>
                      );
                    } else if (message.senderId === uniqueNames[4]) {
                      return (
                        <p>
                          <span style={{ color: "vermilion" }}>
                            {message.senderId}:
                          </span>{" "}
                          {message.text}
                        </p>
                      );
                    } else if (message.senderId === uniqueNames[5]) {
                      return (
                        <p>
                          <span style={{ color: "magenta" }}>
                            {message.senderId}:
                          </span>{" "}
                          {message.text}
                        </p>
                      );
                    } else if (message.senderId === uniqueNames[6]) {
                      return (
                        <p>
                          <span style={{ color: "green" }}>
                            {message.senderId}:
                          </span>{" "}
                          {message.text}
                        </p>
                      );
                    } else if (message.senderId === uniqueNames[7]) {
                      return (
                        <p>
                          <span style={{ color: "yellow" }}>
                            {message.senderId}:
                          </span>{" "}
                          {message.text}
                        </p>
                      );
                    } else if (message.senderId === uniqueNames[8]) {
                      return (
                        <p>
                          <span style={{ color: "orange" }}>
                            {message.senderId}:
                          </span>{" "}
                          {message.text}
                        </p>
                      );
                    } else if (message.senderId === uniqueNames[9]) {
                      return (
                        <p>
                          <span style={{ color: "red" }}>
                            {message.senderId}:
                          </span>{" "}
                          {message.text}
                        </p>
                      );
                    } else if (message.senderId === uniqueNames[10]) {
                      return (
                        <p>
                          <span style={{ color: "purple" }}>
                            {message.senderId}:
                          </span>{" "}
                          {message.text}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            {this.userJoined}
            <TypingIndicator usersWhoAreTyping={this.props.usersWhoAreTyping} />
          </ul>
        </ScrollToBottom>

        <ChatBox onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
      </>
    );
  }
}

export default ChatScreen;
