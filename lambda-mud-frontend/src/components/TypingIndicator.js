import React, { Component } from "react";

class TypingIndicator extends Component {
  render() {
    if (this.props.usersWhoAreTyping.length > 0) {
      return (
        <div
          style={{
            fontSize: "14px",
            fontFamily: "RS5",
            textAlign: "left",
            paddingLeft: "12px"
            // marginTop: "-5px"
          }}
        >
          {`${this.props.usersWhoAreTyping
            .slice(0, 2)
            .join(" and ")} is typing...`}
        </div>
      );
    }
    return <div />;
  }
}

export default TypingIndicator;
