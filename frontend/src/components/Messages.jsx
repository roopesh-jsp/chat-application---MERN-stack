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
          <div
            className="msg"
            style={{
              backgroundColor: user._id === msg.sender._id ? "red" : "green",
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
