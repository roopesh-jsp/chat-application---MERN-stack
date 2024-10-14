import React, { useContext } from "react";
import { AuthContext } from "../store/authContext";
import { senderName } from "../config/chatsLogic";

export default function ChatListItem({ chat }) {
  const { user, setSelectedChat, selectedChat } = useContext(AuthContext);

  const sender = senderName(chat.users, user);

  return (
    <div
      onClick={() => setSelectedChat(chat)}
      className={
        chat._id == selectedChat?._id
          ? "active chat_list_item"
          : "chat_list_item"
      }
    >
      <h3> {sender.name}</h3>
    </div>
  );
}
