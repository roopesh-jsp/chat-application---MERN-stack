import React, { useEffect, useState } from "react";
import { Send, View, ViewIcon } from "lucide-react";
import { useChatContext } from "../context/ChatProvider";
import Profile from "./Profile";
import axios from "axios";
import { useAppContext } from "../context/AppProvider";
function Chat() {
  const { backendUrl, token } = useAppContext();
  const { selectedChat } = useChatContext();
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  async function sendChat(e) {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const message = Object.fromEntries(formData);
      console.log(message);

      e.target.reset();
    } catch (error) {}
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

  useEffect(() => {
    if (selectedChat) {
      if (!selectedChat.isGroup) {
        //send req for one on one chat
        getReciverProfile(selectedChat._id);
      } else {
        //send req for grp chat
      }

      //fetch the selectedchats user data and set it
    }
  }, [selectedChat]);
  if (!selectedChat) {
    return (
      <div className="fallback">
        <h1>please select a chat</h1>
      </div>
    );
  }
  return (
    <div id="chat">
      <div className="chat_head">
        <div className="chat_name">{selectedChat?.chatName}</div>
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
      <div className="chats"></div>
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
