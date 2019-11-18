import React from "react";
import "./ChatBox.scss";
export default ({ text, username, handleTextChange }) => (
  <>
    <div className="chat">
      <input
        type="text"
        value={text}
        placeholder="chat here..."
        className="form-control"
        onChange={handleTextChange}
        onKeyDown={handleTextChange}
      />
    </div>
    <div className="clearfix"></div>
  </>
);
