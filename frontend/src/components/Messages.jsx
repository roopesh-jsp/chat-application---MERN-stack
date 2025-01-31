import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useAppContext } from "../context/AppProvider";
function Messages({ messages }) {
  const { user } = useAppContext();
  return (
    <ScrollableFeed className="feed">
      {messages.map((msg, idx) => (
        <div
          key={msg._id}
          className="msg_wrap"
          style={{
            justifyContent:
              user._id === msg.sender._id ? "flex-end" : "flex-start",
          }}
        >
          {msg.chat.isGroup && user._id !== msg.sender._id ? (
            <div className="msg_user">
              <div className="msg_user_img">
                {console.log(msg.chat.isGroup)}
                <img src={msg.sender.image} alt="" />
              </div>
              <div className="msg_user_name">{msg.sender.name}</div>
            </div>
          ) : (
            <></>
          )}

          <div
            className="msg"
            style={{
              backgroundColor:
                user._id === msg.sender._id ? "#DC143C" : "#018749",
            }}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </ScrollableFeed>
  );
}

export default Messages;
