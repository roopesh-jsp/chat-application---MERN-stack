import React, { useEffect, useState, useRef } from "react";
import { Send, ViewIcon } from "lucide-react";
import { useChatContext } from "../context/ChatProvider";
import Profile from "./Profile";
import axios from "axios";
import { useAppContext } from "../context/AppProvider";
import Messages from "./Messages";
import io from "socket.io-client";

let selectedChatCompare;

function Chat() {
  const { backendUrl, token, user } = useAppContext();
  const { selectedChat, setNotifications, fetchChats } = useChatContext();
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [messages, setMessages] = useState([]);

  const socketRef = useRef(); // UseRef to persist socket instance

  useEffect(() => {
    socketRef.current = io(backendUrl);
    socketRef.current.emit("setup", user);
    socketRef.current.on("connected", () => setSocketConn(true));

    return () => {
      socketRef.current.disconnect(); // Clean up
    };
  }, [backendUrl, user]);

  async function sendChat(e) {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const message = Object.fromEntries(formData);

      const { data } = await axios.post(
        `${backendUrl}/message`,
        {
          content: message.message,
          chatId: selectedChat._id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
      }

      socketRef.current.emit("new msg", data.message);
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  }

  async function getReceiverProfile(id) {
    try {
      const { data } = await axios.post(
        `${backendUrl}/chats/reciver-profile`,
        { chatId: selectedChat._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setSelectedUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchMessages() {
    try {
      const { data } = await axios.get(
        `${backendUrl}/message/${selectedChat._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setMessages(data.messages);
        socketRef.current.emit("chat-room", selectedChat._id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (selectedChat) {
      if (!selectedChat.isGroup) {
        getReceiverProfile(selectedChat._id);
      }
      fetchMessages();
    }
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    if (socketRef.current) {
      const messageListener = (newmsgReceived) => {
        if (
          !selectedChatCompare ||
          selectedChatCompare._id !== newmsgReceived.chat._id
        ) {
          if (!notifications.includes(newmsgReceived)) {
            setNotifications((prev) => [...prev, newmsgReceived]);
            fetchChats();
          }
        } else {
          setMessages((prev) => [...prev, newmsgReceived]);
        }
      };

      socketRef.current.on("newMsgRecived", messageListener);

      return () => {
        socketRef.current.off("newMsgRecived", messageListener);
      };
    }
  }, [selectedChat, notifications, fetchChats]);

  if (!selectedChat) {
    return (
      <div className="fallback">
        <h1>Please select a chat</h1>
      </div>
    );
  }

  function findReceiverName(users) {
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
            : findReceiverName(selectedChat.users)}
        </div>
        <div className="chat_profile" onClick={() => setShowProfile(true)}>
          <ViewIcon />
          {showProfile && (
            <Profile
              user={selectedUser}
              toggle={() => setShowProfile((prev) => !prev)}
            />
          )}
        </div>
      </div>
      <div className="chats">
        <Messages messages={messages} />
      </div>
      <form className="chat_input" onSubmit={sendChat}>
        <input type="text" name="message" placeholder="Type ..." />
        <button>
          <Send />
        </button>
      </form>
    </div>
  );
}

export default Chat;
