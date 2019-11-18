import React from "react";
import "./ChatList.scss";
// import avatar from "./avatar.png";
export default ({ chats }) => (
  <ul>
    {chats.map(chat => {
      return (
        <div>
          <div className="chatMessage">
            <div key={chat.id} className="box">
              <p>
                <span>{chat.username}:</span> {chat.message}
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
);
