import React, { useState } from "react";
import { useChatContext } from "../context/ChatProvider";
import AddgroupModal from "./AddgroupModal";

function Sidebar() {
  const { allChats, selectedChat, setSelectedChat } = useChatContext();

  const [showAddgroup, setShowAddgroup] = useState(false);
  function toggleshowAddgroup() {
    setShowAddgroup((prev) => !prev);
  }
  return (
    <div id="sidebar">
      <div className="sidebar_head">
        <button onClick={() => setShowAddgroup(true)} className="sidebar_btn">
          New group
        </button>
        {showAddgroup ? <AddgroupModal toggle={toggleshowAddgroup} /> : <></>}
      </div>
      <div className="sidebar_users">
        {allChats.map((chat, idx) => (
          <div
            key={chat._id}
            className={`sidebar_user ${
              chat._id === selectedChat?._id ? "sidebar_user_active" : ""
            }`}
            onClick={() => setSelectedChat(chat)}
          >
            {chat.chatName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
