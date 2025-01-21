import React, { useEffect, useState, useRef } from "react";
import { Send, ViewIcon } from "lucide-react";
import { useChatContext } from "../context/ChatProvider";
import Profile from "./Profile";
import axios from "axios";
import { useAppContext } from "../context/AppProvider";
import Messages from "./Messages";
import io from "socket.io-client";
// import { fetchChats } from "../../../backend/controller/chats.controller";

let selectedChatCompare;

function Chat() {
  const { backendUrl, token, user } = useAppContext();
  const { selectedChat, notifications, setNotifications, fetchChats } =
    useChatContext();
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [messages, setMessages] = useState([]);
  const [socketConn, setSocketConn] = useState(false);
  const socketRef = useRef(); // Using useRef to persist the socket instance

  // Initialize the socket connection once, on mount
  useEffect(() => {
    socketRef.current = io(backendUrl);

    socketRef.current.emit("setup", user);
    socketRef.current.on("connected", () => setSocketConn(true));

    // Clean up on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [backendUrl, user]);

  async function sendChat(e) {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const message = Object.fromEntries(formData);

      const { data } = await axios.post(
        backendUrl + "/message",
        {
          content: message.message,
          chatId: selectedChat._id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
      }
      socketRef.current.emit("new msg", data.message); // Emit the new message
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  async function getReciverProfile(id) {
    try {
      const { data } = await axios.post(
        backendUrl + "/chats/reciver-profile",
        { chatId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setSelectedUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMessages() {
    try {
      const { data } = await axios.get(
        backendUrl + `/message/${selectedChat._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setMessages(data.messages);
        socketRef.current.emit("chat-room", selectedChat._id); // Join the chat room
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (selectedChat) {
      if (!selectedChat.isGroup) {
        getReciverProfile(selectedChat._id);
      }
      fetchMessages();
    }
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // Use another useEffect to listen for new messages (with a dependency on selectedChat)
  useEffect(() => {
    if (socketRef.current) {
      const messageListener = (newmsgRecived) => {
        if (
          !selectedChatCompare ||
          selectedChatCompare._id !== newmsgRecived.chat._id
        ) {
          // Give notification (for a different chat)
          if (!notifications.includes(newmsgRecived)) {
            setNotifications((prev) => [...prev, newmsgRecived]);
            fetchChats();
          }
        } else {
          setMessages((prev) => [...prev, newmsgRecived]);
        }
      };

      // Add the event listener for 'newMsgRecived'
      socketRef.current.on("newMsgRecived", messageListener);

      // Cleanup: Remove the event listener on component unmount or when dependencies change
      return () => {
        socketRef.current.off("newMsgRecived", messageListener);
      };
    }
  }, [selectedChat, notifications, fetchChats]); // Add necessary dependencies here

  if (!selectedChat) {
    return (
      <div className="fallback">
        <h1>please select a chat</h1>
      </div>
    );
  }
  console.log(notifications);

  function findReciverName(users) {
    if (user) {
      return users[0]._id !== user._id ? users[0].name : users[1].name;
    }
  }

  return (
    <div id="chat">
      <div className="chat_head">
        <div className="chat_name">
          {selectedChat?.isGroup
            ? selectedChat.chatName
            : findReciverName(selectedChat.users)}
        </div>
        <div className="chat_profile" onClick={() => setShowProfile(true)}>
          <ViewIcon />
          {showProfile ? (
            <Profile
              user={selectedUser}
              toggle={() => setShowProfile((prev) => !prev)}
            />
          ) : null}
        </div>
      </div>
      <div className="chats">
        <Messages messages={messages} />
      </div>
      <form className="chat_input" onSubmit={sendChat}>
        <input type="text" name="message" placeholder="type ..." />
        <button>
          <Send />
        </button>
      </form>
    </div>
  );
}

export default Chat;
