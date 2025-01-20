import React, { useEffect, useState } from "react";
import { Send, View, ViewIcon } from "lucide-react";
import { useChatContext } from "../context/ChatProvider";
import Profile from "./Profile";
import axios from "axios";
import { useAppContext } from "../context/AppProvider";
import Messages from "./Messages";
function Chat() {
  const { backendUrl, token, user } = useAppContext();
  const { selectedChat } = useChatContext();
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const [messages, setMessages] = useState([]);
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
    } catch (error) {}
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
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (selectedChat) {
      if (!selectedChat.isGroup) {
        //send req for one on one chat
        getReciverProfile(selectedChat._id);
      } else {
        //send req for grp chat (will finish later)
      }

      //fetch the selectedchats user data and set it
    }
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);
  if (!selectedChat) {
    return (
      <div className="fallback">
        <h1>please select a chat</h1>
      </div>
    );
  }
  function findReciverName(users) {
    if (user) {
      return users[0]._id != user._id ? users[0].name : users[1].name;
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
          ) : (
            <></>
          )}
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
