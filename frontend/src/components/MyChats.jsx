import React, { useContext, useEffect } from "react";
import { AuthContext } from "../store/authContext";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import ChatListItem from "./ChatListItem";
import { senderName } from "../config/chatsLogic";
import MyChatsRight from "./MyChatsRight";

export default function MyChats() {
  const { token, chats, setChats, user, selectedChat } =
    useContext(AuthContext);
  async function fetchChats() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:3000/chat/fetchChats",
        config
      );

      setChats(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="mychats">
      <div className="mychats_left">
        <h1>my chats</h1>
        {chats ? (
          <>
            {chats.map((chat, idx) => (
              <ChatListItem key={chat._id} chat={chat} />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
      <MyChatsRight />
    </div>
  );
}
