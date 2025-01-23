import React, { useEffect, useState } from "react";
import { useChatContext } from "../context/ChatProvider";
import AddgroupModal from "./AddgroupModal";
import { useAppContext } from "../context/AppProvider";

function Sidebar() {
  const { allChats, selectedChat, setSelectedChat, fetchChats } =
    useChatContext();
  const { user } = useAppContext();

  const [showAddgroup, setShowAddgroup] = useState(false);
  function toggleshowAddgroup() {
    setShowAddgroup((prev) => !prev);
  }
  function findReciverName(users) {
    if (user) {
      return users[0]._id != user._id ? users[0].name : users[1].name;
    }
  }
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div id="sidebar">
      <div className="sidebar_head">
        <button onClick={() => setShowAddgroup(true)} className="sidebar_btn">
          New group
        </button>
        {showAddgroup ? (
          <AddgroupModal
            toggle={toggleshowAddgroup}
            isEdit={false}
            users={[]}
          />
        ) : (
          <></>
        )}
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
            {chat.isGroup ? chat.chatName : findReciverName(chat.users)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
