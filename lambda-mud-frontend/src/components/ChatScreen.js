import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import ChatBox from "./ChatBox";
import "./ChatScreen.scss";
import axios from "axios";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      text: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    console.log("props", this.props);

    // const chatManager = new Chatkit.ChatManager({
    //   instanceLocator: "v1:us1:19220286-039a-4203-bd68-ce7c1bef3446",
    //   userId: this.props.username,
    //   tokenProvider: new Chatkit.TokenProvider({
    //     url: "http://localhost:5000/authenticate"
    //   })
    // });

    // chatManager
    //   .connect()
    //   .then(currentUser => {
    //     this.setState({ currentUser });
    //     return currentUser.subscribeToRoom({
    //       roomId: "71423e2a-f125-4436-9409-098d5572d4e2",
    //       messageLimit: 100,
    //       hooks: {
    //         onMessage: message => {
    //           this.setState({
    //             messages: [...this.state.messages, message]
    //           });
    //         }
    //       }
    //     });
    //   })
    //   .then(currentRoom => {
    //     this.setState({ currentRoom });
    //   })

    //   .catch(error => console.error("error", error));
  }

  sendMessage(text) {
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
      axios.post("http://localhost:5000/message", payload);
      this.setState({ text: "" });
    } else {
      this.setState({ text: e.target.value });
    }
  }

  handleSubmit(e) {
    const payload = {
      username: this.props.username,
      message: this.props.text
    };
    axios.post("http://localhost:5000/message", payload).then(res => {
      console.log(res);
    });
    this.setState({ text: "" });
  }

  render() {
    console.log("render props", this.props);

    return (
      <>
        <div id="chat-list">
          <ul>
            {this.props.messages.map(message => {
              console.log("message", message);
              return (
                <div>
                  <div className="chatMessage">
                    <div key={message.id} className="box">
                      <p>
                        <span>{message.senderId}:</span> {message.text}
                      </p>
                    </div>
                    <div className="imageHolder">
                      {/* <img
                    src={avatar}
                    className="img-responsive avatar"
                    alt="logo"
                  /> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>

        <ChatBox onSubmit={this.sendMessage} />

        <div className="clearfix"></div>
      </>
    );
  }
}

export default ChatScreen;
