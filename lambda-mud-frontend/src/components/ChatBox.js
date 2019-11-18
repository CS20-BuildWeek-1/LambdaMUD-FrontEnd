import React from "react";
import "./ChatBox.scss";
export default ({ text, username, handleTextChange, handleSubmit }) => (
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
      <div class="chat-button">
        <button
          id="chatbtn"
          class="rpgui-button"
          type="submit"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
    <div className="clearfix"></div>
  </>
);
