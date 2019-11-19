import React from "react";
import "./ChatBox.scss";

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ text: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  render() {
    return (
      <div className="chat">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.text}
            placeholder="chat here..."
            className="form-control"
            onChange={this.onChange}

            // onKeyDown={handleTextChange}
          />
          <div class="chat-button">
            <button
              id="chatbtn"
              class="rpgui-button"
              type="submit"
              onClick={this.onSubmit}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default ChatBox;
